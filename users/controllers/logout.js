module.exports = (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).send("Log in first")
    } else {
        req.session.destroy(() => {
            return res.status(200).send("Logged out")
        })
    }
}