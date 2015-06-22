admin = false;   
 var user={

    };
    
exports.signUp = function(req,res,next) {
     
    
    if(req.body.user && req.body.pass){
        user={
            user: req.body.user,
            pass: req.body.pass,
            role: req.body.role
        };
        res.redirect('/');
        
    }
    else{
        res.redirect('/signUp');
    }
}
//check if user exists
exports.checkUser = function (req, res, next) {
    
    
    if(req.body.user === user.user && req.body.pass === user.pass){
        req.session.user = user;
        if(req.session.user.role === "admin"){
            admin = true;
        }
        else{
            admin = false;
        }
        res.redirect('/products');
        
    }
    else{
        res.redirect('/loggedIn');
    }
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