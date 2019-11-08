const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT|| 9000;

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:admin@cluster0-drnph.mongodb.net/bugpredator?retryWrites=true&w=majority", { useNewUrlParser: true }) // this returns promise
    .then(() => console.log("Connected to Mongodb"))
    .catch(() => console.log("Could not connect to Mongodb"));


const auth = require('./routes/auth');
const cart = require('./routes/cart');
const message = require('./routes/message');
const validate = require('./routes/validate');

app.get('/', (req, res) => {
    res.send("App working");
})
app.use('/auth', auth);
app.use('/cart', cart);
app.use('/message',message);
app.use('/validate',validate);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));