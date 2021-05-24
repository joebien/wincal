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

const msgSchema = new mongoose.Schema({
  text: String
})

const fetchMsgs =(req, res)=>{ 
  // console.log('msgs ',msgs)
  // eslint-disable-next-line 
  const Msg = mongoose.model('Msg', msgSchema)
  Msg.find((err,msgs)=>

  // console.log('msgs ',msgs)
  res.send(msgs)

  )
}

const saveMsg =(req)=>{ 
  
  const Msg = mongoose.model('Msg', msgSchema)
  
  const Msg01 = new Msg(req.body) 

  Msg01.save()
}


const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(helmet())



app.get('/api/msgs/', fetchMsgs)

app.post('/api/appts/', )
app.post('/api/msgs/', saveMsg)

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
