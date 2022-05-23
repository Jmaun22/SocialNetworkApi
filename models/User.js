const { model, Schema } = require('monogose');

const Schemauser = new Schema({

    email: {
        required:true,
        match: [/.+@.+\..+/],
        unique: true,
        required: true
    },
    username: {
        required: true,
        unqiue: true,
        trim: true,
        type: String
    },

    friends: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],

},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {

    return this.friends.length;
});

const User = model('Schemauser', 'User');

module.exports = User; 