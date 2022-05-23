const Routes = require('./api/');

const Router = require('express').Router();

Router.use('/api', Routes);

Router.use((req, res) => {

    res.status(404).send('<h2> 404 Error!</h2>');
})

module.exports = router; 