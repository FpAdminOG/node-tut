const express = require('express');
const app = express();
const dateMiddleware = require('./middleware/date.middleware')
const port = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/node-tut'
const userDb = {
    1: 'Sunny',
    2: 'Subarnab',
    3: 'Aditi'
}
dateMiddleware.random()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routes
const userRoute = require('./routes/user.route');

app.use(bodyParser.json());
app.use(dateMiddleware.getDate)
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected");
    } catch (err) {
        console.log("mongo connect error: ", err);
    }
});

app.get('/', (req, res, next) => {
    res.send("<h1>Hello there! </h1>");
});

app.get('/time', (req, res, next) => {
    return res.send(new Date());
});

app.get('/welcome/:userId/:place', (req, res) => {
    console.log(req.query);
    console.log(req.params)
    const id = req.params.userId;
    const place = req.params.place
    const name = userDb[id]
    res.send(`<h1>Welcome ${name} from ${place}</h1>`);
});

app.get('/middleware', (req,res) => {
    res.send(req.date)
})

// Routes
app.use('/user', userRoute)