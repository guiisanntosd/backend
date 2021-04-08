import 'reflect-metadata'
import express from 'express'
import { router } from './routes'
import './database/connection'
import ejs from 'ejs'

const app = express()

app.use(express.json())
app.use(router)

export { app }