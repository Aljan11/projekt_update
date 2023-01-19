const express = require('express');
const bcrypt = require('bcrypt');
const user = require('./../models/user');
const app = express();

app.post('/register', function (req, res){
    let body = req.body;

    let {name, email, password, role} = body;
    let user = new user({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });

    user.save((err, userDB) => {
        if (err){
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        
        res.json({
            ok: true,
            user: userDB
        });
    })
});
module.exports = app;