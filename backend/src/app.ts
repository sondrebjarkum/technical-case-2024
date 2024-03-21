import express from 'express'
import { db } from './database'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/users', (_req, res) => {
    const users = db.getUsers()
    res.status(200).json(users)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

