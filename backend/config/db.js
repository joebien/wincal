import mongoose from 'mongoose'

const MONGO_URI = 'mongodb+srv://joebien2:marsrover@cluster0.a8qpy.mongodb.net/wincal?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
// const MONGO_URI = 'mongodb://localhost:27017/myapp'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error}`)

    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
