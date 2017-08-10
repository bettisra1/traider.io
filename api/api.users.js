var db = require("../db/db.users.js");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    //router.get('/api/users', list);
    //router.get('/api/users/:id', view);
    // post requests
    router.post('/api/users',register);
    //router.post('/api/users/login',login);
    //router.post('/api/users/address',updateAddress);
};

/*

user : {
	firstname: "",
	lastname: "",
	email: "",
	mobile: "",
	addresses: [],

	orders: [
		{
			orderId : #,
			datetime:
			products: [
				{
					productId: "",
					itemCount: "",
					itemPrice: "",
				}
			],
			itemTotal: #,
			packingCharges : "",
			deliveryCharges: ""

			address:{},
			modeOfPayment:""	
		}
	],

}
*/

function register(req, res) {
	console.log("inside register user: "+req.body);
	if(req.body.firstname === undefined ||
		req.body.lastname === undefined ||
		req.body.email === undefined ||
		req.body.mobile === undefined 
	) {
		res.send(400,{payload: req.body});
	}
	var userRequest = req.body;
	
	db.insert({
		"firstname": userRequest.firstname,
		"lastname": userRequest.lastname,
		"email": userRequest.email,
		"mobile": userRequest.mobile
	}, function(result){
		res.json(result);
	});

}
