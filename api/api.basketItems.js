var expressSession = require("express-session");
var requestJson = require("request-json");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    router.get('/api/basketItems/Add/:productId', addItem);
    router.get('/api/basketItems/', list);
    router.post('/api/basketItems/Add',addMany);
};

var list = function(req, res) {

    var sess = req.session;
    if (sess.products) {
        return res.json(sess.products);
    } else {
        return res.json({});
    }
};

var addItem = function(req, res) {

    var productId = req.params.productId;

    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function(err, result, data) {
        if (err) {
            return res.send(500);
        }

        var productInfo = {
            "productId": data._id,
            "name": data.name,
            "price": data.offers.price
        };


        var sess = req.session;
        if (!sess.products) {
            sess.products = new Array();
        }
        sess.products.push(productInfo);
        return res.send({
            ItemCount: sess.products.length
        });

        //return console.log(body.rows[0].title);
    });

};

var addMany = function(req, res) {
    var productId = req.body.id;
    console.log("api.basketItems.js: addMany : req"+ req.body.id);
    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function(err, result, data) {
        if (err) {
            return res.send(500);
        }
        console.log(data);
        var productInfo = {
            "productId": data._id,
            "name": data.name,
            "price": data.offers.price,
            "itemCount" : req.body.itemCount
        };


        var sess = req.session;
        if (!sess.products) {
            sess.products = new Array();
        }
        sess.products.push(productInfo);
        return res.send({
            ItemCount: sess.products.length
        });

        //return console.log(body.rows[0].title);
    });

}