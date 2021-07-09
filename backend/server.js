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

const apptSchema = new mongoose.Schema({
  _id: String,
  date: String,
  time: String,
  apptTxt: String,
  hours: String,
  month: String,
  year: String
})

const deleteAppt = (req, res)=>{ console.log('deleteAppt.query ',req.query._id )
  const Appt = mongoose.model('Appt', apptSchema)
  Appt.findByIdAndDelete(req.query._id , (res)=> console.log('deleteRes',res))

  res.send(req.query._id)

}

const saveAppt =(req, res)=>{ 
  const Appt = mongoose.model('Appt', apptSchema )
  const id = mongoose.Types.ObjectId();
  

  const Appt01 = new Appt(req.body) 

  Appt01._id = id

  Appt01.save()

  res.json(Appt01)

}



const fetchAppts =(req, res)=>{ 

  const Appt = mongoose.model('Appt', apptSchema)

  Appt.find(req.query, (err,appts)=> 


  
  res.send(appts)

  )}




///////////////////////////////////////////////////////////////////
  const editAppt = async (req, res)=>{ 
    
    
    const appt = req.body
  
    const query = {_id:appt._id}
    const reqnewData = {apptTxt:appt.apptTxt, time:appt.time, hours:appt.hours}

    const Appt = mongoose.model('Appt', apptSchema )
 
  ////////////////////////////////////////////////////////////////////////
    
    let doc = await Appt.findOneAndUpdate(query, reqnewData, {new:true})
    console.log('doc',doc)
    res.send(doc)
  
  }


const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(helmet())

app.get('/api/appts/', fetchAppts)

app.post('/api/appts/', saveAppt)
//////////////////////////////////////////////////////////////////////////////

app.delete('/api/delappt', deleteAppt)

app.put('/api/appts', editAppt)










app.post('/api/msgs/', saveMsg)
app.get('/api/msgs/', fetchMsgs)





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

