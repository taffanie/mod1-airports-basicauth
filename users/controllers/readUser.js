const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
    const id = req.params.id;
    const o_id = new ObjectId(id);
    const user = User.findOne({ _id: o_id })

    if (!req.session.user_id) {
        return res.status(401).send("Please login")
    }

    user
        .then(data => {
            res.status(200).send("Found user " + data)
        })
        .catch(err => {
            console.log(err)
        })
}