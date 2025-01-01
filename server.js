const express = require('express')
const app = express();
const db = require('./db')

require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

const studentRoutes = require('./routes/studentRoutes');

app.use('/student',studentRoutes)

app.listen(PORT,()=>{
    console.log("Listening on PORT 3000");
})