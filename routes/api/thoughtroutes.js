

const Router = require('express').Router();

const {

    allThoughts,
    newThought,
    idThought,
    thoughtUpdate,
    reactionAdd,
    reactionDelete

} = require('../../controllers/controllerThought');


Router
.route('/')
.get(allThoughts)
.post(newThought);


Router
.route('/:thoughtId/reactions')

.post(reactionAdd)
.delete(reactionDelete)


Router
.route('/:id')
.get(idThought)
.put(thoughtUpdate)
.delete(reactionDelete);


module.exports = Router

