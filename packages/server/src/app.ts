import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes/Todo"
import * as Dotenv from 'dotenv'

Dotenv.config()

const app: Express = express()

const PORT: string | number = process.env.PORT || 5000

app.use(cors())

app.use(todoRoutes)

mongoose.set("useFindAndModify", false)

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@db:27017/${process.env.MONGO_DB}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })

