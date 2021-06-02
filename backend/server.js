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
import c from 'config'



dotenv.config()

connectDB()

const msgSchema = new mongoose.Schema({
  text: String
})

const apptSchema = new mongoose.Schema({
  _id: String,
  date: String,
  time: String,
  apptTxt: String,
 
})

const deleteAppt = (req)=>{ console.log('deleteAppt.query ',req.query._id )


  const Appt = mongoose.model('Appt', apptSchema)

  Appt.findByIdAndDelete(req.query._id 
  , (res)=> console.log('deleteRes',res))


  


}



const fetchMsgs =(req, res)=>{ 
 
  const Msg = mongoose.model('Msg', msgSchema)
  Msg.find((err,msgs)=>

 
  res.send(msgs)

  )
}



const saveMsg =(req)=>{ 
  
  const Msg = mongoose.model('Msg', msgSchema)
  
  
  const Msg01 = new Msg(req.body) 

  Msg01.save()
}

const saveAppt =(req)=>{ 
  
  const Appt = mongoose.model('Appt', apptSchema )
  
  const Appt01 = new Appt(req.body) 

  const id = mongoose.Types.ObjectId();

  Appt01._id = id

  console.log('Appt01 ',Appt01)

  Appt01.save()
}



const fetchAppts =(req, res)=>{ 
  console.log(`
  fetchAppts.query ${JSON.stringify(req.query)}`
  )
  
  const Appt = mongoose.model('Appt', apptSchema)

  Appt.find(req.query, (err,appts)=> 

  //Appt.find({"time":"1621656000000"}, (err,appts)=> 
  
  res.send(appts)

  )




const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(helmet())

app.get('/api/appts/', fetchAppts)

app.post('/api/appts/', saveAppt)
//////////////////////////////////////////////////////////////////////////////

app.post('/api/msgs/', saveMsg)
app.get('/api/msgs/', fetchMsgs)

app.delete('/api/delappt', deleteAppt)



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
    `Server running ${process.env.NODE_ENV} mode on post ${PORT}`.yellow.bold
  )
)
