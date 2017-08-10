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
	password: "",
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
	console.log("inside register user: "+req.body.mobile);
	if(req.body.firstname === undefined ||
		req.body.lastname === undefined ||
		req.body.email === undefined ||
		req.body.mobile === undefined ||
		req.body.password === undefined
	) {
		res.json({"errorCode": 400,"payload": req.body, "message":"Invalid Payload"});
		return;
	}
	var userRequest = req.body;
	db.find(userRequest.email,function(docs){
		console.log("Register user: Number of users with email: "+userRequest.email+ " is: "+docs.length);
		if(docs.length > 0){
			res.send({"errorCode" : 400, "message": "User with same email already exists"});
		} else {
			db.insert({
				"firstname": userRequest.firstname,
				"lastname": userRequest.lastname,
				"email": userRequest.email,
				"mobile": userRequest.mobile,
				"password" : userRequest.password
			}, function(result){
				res.json({"errorCode" : 200, "message": "Ok", "payload":result});
			});
		}
	});
}
