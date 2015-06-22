
//check if user exists
exports.checkUser = function (req, res, next) {
    var user = req.body.user;
    if(user){
        req.session.user = user;
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

            res.render( 'productList', {product:results});
        });
    });
};