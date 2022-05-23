
const Router = require('express').Router();
const routesThought = require('./routesThoughts');
const routesUser = require('./routesUser');


Router.use('/thoughts', routesThought);
Router.use('/users', routesUser);

module.exports = Router;