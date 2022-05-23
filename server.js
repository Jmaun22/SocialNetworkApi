const express = require('express');
const db = require('./config/connection');

// models

const { model} = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes

// User routes
    // Get all users
    // get a single user by its id
    // Post a new user
    // update a new user
    // delete a new user

    


// user/friends

    // post a new friend to a users friend list
    // delete to remove from a users friend list

// thoughts route

    // get all thoughts
    // get a single thought by its id
    // POST to create a new thought
    // update a thought by its id
    // deelete a thought by its id

// thoughts/reactions route

    // POST to create a reaction stored in a single throughts raction array
    // delete to pull or remove a reaction by the reactionsId value