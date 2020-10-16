const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const Model = require('../models/model')


//USERS LIST
router.get('/', verifyToken, async (req, res) => {
    const users = await Model.find()
    jwt.verify(req.token, 'secretkey', (error, usersData) =>{
            if(error){
            res.status(401).json({
                "error": "No token provided"
            })
        } else {
            
            res.json(users)
        }
    })
    
    
});


//USER LIST
router.get('/:id', verifyToken, getUser, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, user) => {
        if(error){
            res.status(401).json({
                "error": "No token provided"
            })
        } else {
            res.json(res.user)
        }
    })
    

});


//CREATING USER
router.post('/', verifyToken, async (req, res) => {

     const user = new Model({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
        age: req.body.age,
        image: req.body.image
    })     
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(401).json({
            "error": "Error creando usuario"
        })
    }
   
    
    
});

//UPDATING USER
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.first_name != null){
        res.user.first_name = req.body.first_name
    }
    if(req.body.last_name != null){
        res.user.last_name = req.body.last_name
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({
            "error" : "error error error"
        })
    }
});

//REMOVING USER
router.delete('/:id', getUser, async (req, res) => {
    try {
       await res.user.remove() 
       res.json({
           "message": "User removed"
       })   
    } catch (error) {
        res.status(404).json({
            "error": "Error removing user"
        })
    }
});


async function getUser(req, res, next){
    let user
    try {
        user = await Model.findById(req.params.id)
        if(user == null){
            return res.status(401).json({
                "error": "User not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            "error": "error error error"
        })
    }
    res.user = user
    next()
}

// Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearearHeader = req.headers['authorization'];
    if(typeof bearearHeader !== 'undefined'){
        const bearearToken = bearearHeader.split(" ")[1];
        req.token = bearearToken;
        next();
    } else{
        res.status(401).json({ "error": "Error in user or password" })
    }
}


module.exports = router;