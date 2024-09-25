import dotenv from 'dotenv'
import mongoose from 'mongoose'

import app from './app'
import { connectDB } from './utils'

dotenv.config()
const port = process.env.PORT || 8080

connectDB()

mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.')
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port:${port}`)
  })
})
