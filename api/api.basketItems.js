var expressSession = require("express-session");
var requestJson = require("request-json");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    router.get('/api/basketItems/Add/:productId', addItem);
    router.get('/api/basketItems/', list);
    router.post('/api/basketItems/Add',addMany);
    router.post('/api/basketItems/Remove', remove);
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
            "price": data.offers.price,
            "itemCount" : 1

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
    var requestItemCount = req.body.itemCount*1;
    console.log("api.basketItems.js: addMany : req"+ req.body.id);
    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function(err, result, data) {
        if (err) {
            return res.send(500);
        }
        console.log(data);        

        var sess = req.session;
        if (!sess.products) {
            sess.products = new Array();
            var productInfo = {
                "productId": data._id,
                "name": data.name,
                "price": data.offers.price,
                "itemCount" : requestItemCount
            };
            sess.products.push(productInfo);
            return res.send({
                ItemCount: sess.products.length
            });
        } else {
            var exists = false;
            for (var i = 0; i < sess.products.length; i++) {
                if(productId == sess.products[i].productId)
                {
                    exists = true;
                    sess.products[i].itemCount = sess.products[i].itemCount*1 + requestItemCount;
                }  
            }
            if(!exists)
            {
                var productInfo = {
                    "productId": data._id,
                    "name": data.name,
                    "price": data.offers.price,
                    "itemCount" : requestItemCount
                };
                sess.products.push(productInfo);
            }
            return res.send({
                ItemCount: sess.products.length
            });
        }

        sess.products.push(productInfo);
        return res.send({
            ItemCount: sess.products.length
        });

        //return console.log(body.rows[0].title);
    });

};

var remove = function(req, res) {
    var productId = req.body.id;
    var requestItemCount = req.body.itemCount;
    console.log("api.basketItems.js: remove: id: " + productId);

    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function(err, result, data) {
        if (err) {
            return res.send(500);
        }
        console.log(data);
        /*var productInfo = {
            "productId": data._id,
            "name": data.name,
            "price": data.offers.price,
            "itemCount" : req.body.itemCount
        };*/


        var sess = req.session;
        if (!sess.products) {
            sess.products = new Array();
            return res.send({
                ItemCount: sess.products.length
            });    
        } else {
            var newProducts = new Array();
            for (var i = 0; i < sess.products.length; i++) {
                if(productId != sess.products[i].productId)
                {
                    newProducts.push(sess.products[i]);
                } else {
                    if(sess.products[i].itemCount > requestItemCount)
                    {
                        sess.products[i].itemCount = sess.products[i].itemCount - requestItemCount;
                        newProducts.push(sess.products[i]);
                    }
                }
            }
            sess.products = newProducts;
            return res.send({
                ItemCount: sess.products.length
            });
        }

        //return console.log(body.rows[0].title);
    });
}
