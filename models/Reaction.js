const {model, Types, Schmea} = require('mongoose');




const moment = require('momnet');


const schemaReaction = new schemaReaction({
    username: {
        type: String,
        required: true

    },
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        required: true,
        type: String,
        maxLength: 280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal.format('MMM DD, YYYY [at] hh:mm a'))

    }
   
},
{
    toJSON: {
        getters: true
    },
    id: false
})


module.exports = reactionSchema;