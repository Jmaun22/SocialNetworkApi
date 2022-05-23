const moment = require('moment');

const reactionSchema = require('./Reaction');

const {Schema, model} = require('mongoose');


const Schemathought = new Schema({

    username: {
        type: String,
        required: true
    },
    
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        },
        thoughtText: {
            required: true,
            maxLength: 1,
            type: String,
            minLength: 1,
        },
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    

});

Schemathought.virtual('reactionCount').get(function() {

    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

