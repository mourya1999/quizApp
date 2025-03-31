import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import UserRouter from './router/user.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('view', './view')


app.use(UserRouter)

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`)
})