const User = require('../models/User');

module.exports = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user
        .save()
        .then(data => {
            res.status(201).send("Created user: " + data)
        })
        .catch(err => {
            console.log(err)
        })
}

