const User = require('../models/User');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
    const id = req.params.id;
    const o_id = new ObjectId(id);
    const user = User.findOne({ username: req.body.username })
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
            // use mongo user id as session id
            req.session.user_id = o_id
            console.log(o_id, req.session.id)
            return res.status(200).send("Logged in")
        })
    }
}