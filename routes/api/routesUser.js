const { use } = require('.');
const { Thought, User } = require('../models');


const Controlleruser = {

    allUsers(req, res) {

        User.find({})
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    userCreate ({body}, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    }

}