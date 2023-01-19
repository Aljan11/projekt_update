require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//
app.use(bodyParser.urlencoded({ extended: false}))

//
app.use(bodyParser.json())

//
app.use(require('./routes/index'));

let renderHTML = path.resolve(__dirname, '../public/index.html');
app.get('/', function (req, res){
    res.sendFile(renderHTML);
})

mongoose.connect(progress.env.URLDB, {
    userNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) throw err;
    console.log("Online data bass");
});
