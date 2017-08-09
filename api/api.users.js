var db = require("../db/db.users.js");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    router.get('/api/users', list);
    router.get('/api/users/:id', view);
    // post requests
    router.post('/api/users',register);
    router.post('/api/users/login',login);
    router.post('/api/users/address',updateAddress);
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
	]
}
*/

function register(req, res) {

	db.insert()
}
