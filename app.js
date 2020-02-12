const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
let Article = require("./models/article");
// let Book = require("./models/book");

const app = express();

app.set('views' , path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// mongoose.connect('mongodb://localhost/nodekd');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nodekd',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Establishing connecting to the MongoDb database
mongoose.connect("mongodb+srv://chetan:chetan123@cluster0-ccymr.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if(error){
        console.log('Got an error!!');
    }else{
        console.log('Connected succesfully');
    }
})
mongoose.connection.on('connected',(error)=>{
    if(error){
        console.log('Error handling DB', error);
    }else{
        console.log("Connected to mongo");
    }
});



app.use(express.static(path.join(__dirname, 'public')));

// Express-sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// Express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('/', (req,res) =>{
    Article.find({}, (error,articles)=>{
        if(error){
            console.log(error);
        }else{
            res.render('index',{
                title:'Article',
                articles:articles
            });
        }
    });
});

let articles = require('./routes/article');
app.use('/article', articles);  
// app.use(app.router);



app.listen(port , () => console.log(`Server is listening at ${port}`));