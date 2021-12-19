const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const dbAssign = require('./config/db')
const router = require('./router/routes')
const cors = require('cors')

dbAssign()

app.use(cors());
app.options("*", cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join('images')))

app.use('/', router)
app.get('/', (req, res) => {
    res.send('Tester beta')
})

app.listen(port, () => {
    console.log(`server berjalan http://localhost:${port}`)
})