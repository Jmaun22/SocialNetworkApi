const Router = require('express').Router();

const {
    
    allUsers,
    userCreate,
    userId,
    userDelete,
    userUpdate,
    frindDelte,
    friendAdd
} = require('../../controllers/contollersUser');


Router
.route('/')
.get(allUsers)
.post(userCreate)

Router
.route('/:userId/friends/:friendId')
.get(userId)
.post(friendAdd)
.delete(frindDelte)

Router
.route(':/id')
.put(userUpdate)
.delete(userDelete)