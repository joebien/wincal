import path from 'path'
import express from 'express'
// const bodyParser= require('body-parser')
import dotenv from 'dotenv'
import helmet from 'helmet'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import mongoose from 'mongoose'

dotenv.config()

connectDB()

const apptSchema = new mongoose.Schema({
  _id: String,
  userName: String,
  date: String,
  time: String,
  apptTxt: String,
  hours: String,
  month: String,
  year: String
})

const UserApptsSchema = new mongoose.Schema({
 userName: String,
 appts: Array
});

const createUserAppts =(req, res)=>{ 

  const UserAppts = mongoose.model('UserAppts', UserApptsSchema)

  const newUserAppts = new UserAppts()

  newUserAppts.userName = req.body.userName

  newUserAppts.save().then(savedDoc => {
    res.send(savedDoc)
  });

}

const saveAppt = async (req, res)=>{   
  
  console.log('req.body ',req.body.datetime)

  const UserAppts = mongoose.model('UserAppts', UserApptsSchema)
    
  const currentUserAppts = await UserAppts.findOne(
    {userName: req.body.userName},(err, user)=>{
  })

 

  if(!currentUserAppts.appts.some(
    appt => appt.datetime === req.body.datetime)) { 
   
    currentUserAppts.appts.push(req.body)

    currentUserAppts.save()
  }

   res.send(req.body)
}

const daysWithAppts = async (req, res)=>{  

  const UserAppts = mongoose.model('UserAppts', UserApptsSchema)

  UserAppts.findOne({userName: req.query.userName},(err, obj)=>{
    if(obj){ 
      res.send(
      obj.appts
      )}
  })
}

const fetchAppts = async (req, res)=>{  


  const UserAppts = mongoose.model('UserAppts', UserApptsSchema)

  UserAppts.findOne({userName: req.query.userName},(err, user)=>{

    
   
    if(user){
      res.send(user.appts.filter(appt=>appt.datetime.slice(0,10) === req.query.datetime.slice(0,10)))
    }
    })
}

const deleteAppt = (req, res)=>{  
  
  console.log('req.query' ,req.query)

  const UserAppts = mongoose.model('UserAppts', UserApptsSchema)

  UserAppts.findOneAndUpdate({userName:req.query.userName},
    {$pull: {appts:{date:req.query.date}}}, err => {
      if (err) {
        console.log('error')
        
        return 'error'
      }
    }
    )

}

const updateAppt = async (req, res)=>{ 
  console.log('updateApptreqbody ',req.body )
  
  const UserAppts = mongoose.model('UserAppts', UserApptsSchema)

  let appts = await UserAppts.findOneAndUpdate(

    {userName:req.body.userName},
    {$set: {'appts.$[appt].datetime':req.body.newdatetime,
            'appts.$[appt].txt':req.body.txt
    
   }},
    // {$set: {'appts.$[appt].txt':req.body.txt }},
    {arrayFilters: [{ 'appt.datetime': req.body.datetime }]}

  )
}

const userSchema = new mongoose.Schema({
  _id: String,
  userName: String,
  email: String
})

const signInUser = (req, res)=>{



  const User = mongoose.model('user', userSchema )

  User.find( req.query, (err,users)=>{
   
    res.send( users.length > 0)
  })

}

const createNewUser = (req, res)=>{

  const User = mongoose.model('user', userSchema )

  User.find(req.body, (err,users)=>  {
  
    if(users.length > 0){  
     
      res.send( 'in use' )
    }else{
      const id = mongoose.Types.ObjectId();
      const newUser = new User(req.body) 
      newUser._id = id
      newUser.email = id

      newUser.save()
      res.send( newUser )
    }
  })

}

///////////////////////////////////////////////////////////////////


const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(helmet())

app.post('/api/users/', createNewUser)

app.post('/api/appts/', createUserAppts)

app.post('/api/appts/newAppt', saveAppt)

app.get('/api/users/signin', signInUser)

app.get('/api/appts/', fetchAppts)

app.get('/api/appts/dayswappts', daysWithAppts)

// app.post('/api/appts/', saveAppt)
//////////////////////////////////////////////////////////////////////////////

app.delete('/api/delappt', deleteAppt)

app.put('/api/appts/updateAppt', updateAppt)

app.use('/api/users', userRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)

app.use(errorHandler)

// const PORT = process.env.PORT || 4000

const PORT = 4000

app.listen(
  PORT,
  console.log(
    `Server running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

