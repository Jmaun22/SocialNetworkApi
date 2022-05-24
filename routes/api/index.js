
const Router = require('express').Router();
const routesThought = require('../../controllers/contollersThoughts');
const routesUser = require('../../controllers/contollersUser');


Router.use('/thoughts', routesThought);
Router.use('/users', routesUser);

module.exports = Router;