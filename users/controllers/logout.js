module.exports = (req, res) => {
    req.session.destroy(() => {
        res.status(200).send("Logged out")
    }
    )
}