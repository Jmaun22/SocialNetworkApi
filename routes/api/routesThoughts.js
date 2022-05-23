const { User, Thought, Reaction} = require('../models');


const controllerThought = {
    
    allThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(ThoughtData => res.json(ThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    newThought({ body }, res) {
        Thought.create(body)
        .then(ThoughtData => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: ThoughtData._id}},
                { new: true }
            )
            .then(ThoughtData => {
                if(!ThoughtData){
                    res.status(404).json({ message: 'this id does not have an user'});
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));

    },
    idThought({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(ThoughtData => {
            if (!ThoughtData) {
                res.status(404).json({message: 'this id does not have a thought'});
                return;
            }
            res.json(ThoughtData);
            
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
  thoughtUpdate({ params, body }, res) {

    Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true}
    )
    .then(ThoughtData => {
        if (!ThoughtData) {
            res.status(404).json({ message: 'this id does not have a thought'});
            return;
        }
        res.json(ThoughtData);
    })
    .catch(err => res.json(ThoughtData));
  },

reactionAdd({ params, body , res}) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId},
        { $addToSet: {reactions: body}},
        {new: true, runValidators: true}
    )
    .then(ThoughtData => {
        if(!ThoughtData) {
            res.status(404).json({ message: 'this id does not have a thought'});
            return;
        }
        res.json(ThoughtData);
    })
    .catch(err => res.status(500).json(err));


},

reactionDelete( {params, body}, res) {

    Thought.findOneAndUpdate(

        { _id: params.thoughtId},
        { $pull: { reactions: {reactionId: body.reactionId}}},
        { new: true, runValidators: ture}
    )
    .then(Thoughtdata => {
        if (!Thoughtdata) {
            res.status(404).json( {message: 'this id does not have thoguht'});
            return;
        
        }
        res.json({message: 'reaction deleted'});
    })
    .catch(err => res.status(500).json(err));
},



    

  
}

module.exports = controllerThought