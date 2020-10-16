require('dotenv').config()
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        "error": "Not found"
    })
})

app.post('/login', (req, res) => {
    const user = {
        "email": "user@example.com",
        "password": "secure"
    }
    
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            
            token            
        });

    });
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
})