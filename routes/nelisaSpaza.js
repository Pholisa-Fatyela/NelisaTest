var bcrypt = require('bcrypt');
admin = false;   
var user={};
    
exports.signUp = function(req,res,next) {
    if(req.body.user && req.body.pass){
        user={
            username: req.body.user,
            password: req.body.pass,
            role: req.body.userRole
        };
        req.getConnection(function (err, connection){
           bcrypt.genSalt(10, function(err, salt){
               bcrypt.hash(req.body.pass, salt, function(err, hash){
                   user.password = hash;
                   connection.query('INSERT INTO users set ?', user, function(err, results){
                       if(err){
                           console.log('Error inserting : %s ' , err);
                           res.redirect('/signUp');
                       }
                       else{
                            res.render('home', {msg: "Successfully Signed Up"})
                       }
                       });
                   });
            });
       });
        
    }
    else{
        res.render('signUp', {msg: "Fields can not be empty"} );
    }
};

//check if user exists
exports.checkUser = function (req, res, next) {
    req.getConnection(function(err, connection){
        if(err){
            console.log(err);
        }
        var userName = req.body.user;
        connection.query("SELECT password FROM users WHERE username = ?", [userName], function(err,results){
            if(err){
                console.log(err);
            }
            var data = results[0];
            
            bcrypt.compare(req.body.pass, data.password, function(err, results) {
                console.log(results);
                if(results == true){
                    req.session.user = {username: userName};
                    res.render('loggedIn', {user: req.session.user});
                }
                else{
                    res.render('home',{msg: "Log In Failed"});
                }
            });
            
            
        });
    });
};

// display table data function from the db(read)
exports.showProducts = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err)
            return next(err);
        connection.query('SELECT prod_id,prod_name,cat_name from product,category where product.cat_id = category.cat_id', [], function(err, results) {
            if (err) return next(err);

            res.render( 'productList', {product:results, user:req.session.user, admin:admin});
        });
    });
};

exports.logOut = function(req,res,next){
    delete req.session.user;
    res.redirect('/');
};