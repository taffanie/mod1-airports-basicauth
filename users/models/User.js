const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"]
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    }
}, { timestamps: true })

// before we save a record into database
UserSchema.pre("save", function (next) {
    // get the current user
    const user = this;

    // hash the password
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            console.log(error)
        }
        user.password = hash;
        next();
    })
});

module.exports = mongoose.model('User', UserSchema)