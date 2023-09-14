const UserModel = require('../models/user.model');

const router = require('express').Router();

router.get('/name', (req, res) => {
    res.send("<h1>Hello there! </h1>");
});

router.post('/save', async (req, res) => {
    try {
        console.log(req.body)
        await UserModel.create(req.body);
        res.send("User created");
    } catch (err) {
        res.status(400).send({err: err, message: "Error creating user"});
    }
});

module.exports = router;