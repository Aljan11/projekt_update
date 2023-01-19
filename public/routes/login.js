
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const app = express();

app.post('/login', function (req, res){
        //
    let body = req.body;

    User.findOne({email: body.email}, (erro, userDB)=>{
        if (erro){
            return res.status(500).json({
                ok: false,
                err: error
            })
        }
        //
        if (!userDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Incorrect user or password"
                }
            })
        }
        //
        if (! bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Incorrect user or password"
                }
            });
        }
        //
        let token = jwt.sign({
            user: userDB,
        }, process.env.SEED_AUTENTICATION, {
            expiresIn: process.env.EXPIRES_TOKEN
        })

        res.json({
            ok: true,
            user: userDB,
            token,
        })
    })
})

module.exports = app;






const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nodelogin'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));

//http://localhost:3000/
app.get('/', function(request, response){
    // Render login template
    response.sendFile(path.join(__dirname + '/login.html'))
});

// http://localhost:3000/auth
app.post('/auth', function(request, response){
    //
    let username = request.body.username;
    let password = request.body.password;
    //
    if (username && password){
        //
        connection.query('SELECT * FROM accoutns WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            //
            if (error) throw error;
            //
            if (results.length > 0) {
                //
                request.session.loggedin = true;
                request.session.username = username;
                //
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

// http://localhost:3000/home
app.get('/home', function(request, response){
    //
    if (request.session.loggedin){
        //
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        //
        response.send('Please login to view this page!');
    }
    response.end();
});
