const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    first_name:{
        type: String,
        maxlength: 128,
        required: true
    },
    last_name:{
        type: String,
        maxlength: 128,
        required: true
    },
    email:{
        type: String,
        maxlength: 64,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    },
   
    age:{
        type: Number,
        maxlength: 100
    },
   image:{
        type: String,
        data: Buffer
    },
    description:{
        type: String,
        maxlength: 255,
    }
})

module.exports = mongoose.model('Model', usersSchema);