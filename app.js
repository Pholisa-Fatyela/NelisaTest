var express = require('express'),
    mysql = require('mysql'),
    exphbs  = require('express-handlebars'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    nelisaSpaza = require('./routes/nelisaSpaza'),
    session = require('express-session');



var app = express();
var user = {};
var dbOptions = {
     host: 'localhost',
      user: 'root',
      password: 'spot',
      port: 3306,
      database: 'NelisaTest'
};


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(session({secret: "worms", cookie: {maxAge: 120000}, resave: true, saveUninitialized: false}));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res){
  res.render('home');
});

app.post('/login', nelisaSpaza.checkUser);
app.get('/logOut',nelisaSpaza.logOut);

app.get('/signUp', function(req,res){
  res.render('signUp');
});
app.post('/signUp', nelisaSpaza.signUp);

app.use(function (req,res,next) {
  if(req.session.user){
    next();
  }
  else{
    res.redirect('/');
  }
});

//gets data from the database and displays it on the web page
app.get('/products', nelisaSpaza.showProducts);



var server = app.listen(5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Nelisa app listening at http://%s:%s', host, port);

});