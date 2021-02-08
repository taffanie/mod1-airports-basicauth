const User = require('../models/User');
const bcrypt = require('bcrypt');

// basic auth passes username/password along - cb is also from basic auth
const customAuthorizer = async (username, password, cb) => {
    const user = await User.findOne({ username: username })

    if (user) {
        bcrypt.compare(password, user.password, (err, res) => {
            return cb(null, res)
        })
    } else {
        return cb(null, false)
    }
}

// // Test
// function customAuthorizer(username, password, cb) {
//     if (username.startsWith('a') & password.startsWith('a'))
//         return cb(null, true)
//     else
//         return cb(null, false)
// }

module.exports = customAuthorizer;