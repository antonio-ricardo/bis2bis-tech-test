import 'express-async-errors'
import 'dotenv/config'
import { errorHandler } from './middlewares/errorHandler.middleware'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import universityRoutes from './routes/university.routes'
import userRoutes from './routes/user.routes'
import './cronjob/dailyUniversitySave.cronjob'

export const app = express()

app.use(express.json())
app.use(cors({ origin: 'https://bis2bis.com.br' }))

app.use('/universities', universityRoutes)
app.use('/users', userRoutes)

app.use(errorHandler)
app.listen(process.env.PORT || 3000, async () => {
  await mongoose.connect('mongodb://antonio:123@localhost:27017')
  console.log(`Servido esta rodando na porta ${process.env.PORT || 3000}`)
})
