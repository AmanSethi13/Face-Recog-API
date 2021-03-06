const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
});


const app = express();


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'https://mysterious-bastion-30381.herokuapp.com/');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


app.get('/', (req, res)=>{
    res.send('its working');
})


//sign in

app.post('/signin', (req, res)=> {signin.handleSignin(req, res, db, bcrypt)});

//display profile
app.get('/profile/:id',(req, res) =>{
    profile.handleProfile(req, res, db)
})

//display rank (number of images posted)

app.put('/image',(req, res)=>{
    image.imageHandle(req, res, db)
    
})

app.post('/imageurl', (req, res) => {
    image.HandleApiCall(req, res)

})

//register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})


var port = process.env.PORT || 3000;

// console.log(port);

app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})
