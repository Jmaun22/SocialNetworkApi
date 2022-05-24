
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

    userCreate({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    userId({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                { path: 'thoughts', select: "-__v" },
                { path: 'friends', select: "-__v" }
            ])

    },
    userDelete({ params }, res) {

        User.findOneAndDelete({ _id: params.id })
            .then(dataUser => {
                if (!dataUser) {
                    res.status(404).json({ message: 'user with out id' });
                    return;
                }

            })
    },

    userUpdate({ params, body }, res) {
        User.findOneAndUpdate({
            _id: params.id
        }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'no id with this user' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    frindDelte({ params }, res) {

        User.findOneAndUpdate(

            { _id: params.userId },
            { $pull: { firends: params.friendId } },
            { new: true, runValidators: true }

        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'there arent any users with this id' });
                    return;
                }

                User.findOneAndUpdate(
                    {_id: params.friendId},
                    {$pull: { friends: params.userId}},
                    { new: true, runValidators: true}

                )
                .then(userDatafriendId => {
                    if(!userDatafriendId){
                        res.status(404).json({message: 'there isnt an user iwth this friendid'})

                        return;
                    }
                    res.json({message: 'frend was deleted'});
                })
            
            .catch(err => res.json(err));
        })
    .catch(err => res.json(err));

    },

    friendAdd( {params}, res) {

        User.findOneAndUpdate(
            {_id: params.userId },
            { $addToSet: { friends: params.friendId }},
            {new: true, runValidators: true }
        )
        .then(userData => {
            if(!userData) {

                res.status(404).json({ message: 'user not found'})
                return;
            }

            User.findOneAndUpdate(
                { _id: params.friendId},
                { $addToSet: { friends: params.userId}},
                { new: true, runValidators: true}
            )
            .then(userDatafriendId => {
                if(!userDatafriendId) {
                    res.status(404).json({ message: 'none with this id'})

                    return;
                }
                res.json(userDatafriendId)
            })
            .catch(err => res.json(err));
        

            })
            .catch(err => res.json(err));
        

    },

                  

}

module.exports = Controlleruser