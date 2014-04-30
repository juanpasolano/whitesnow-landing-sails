/**
 * HomeController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {
	index: function(req, res){
		var id = req.param('id');
		var token = req.param('token');
        Invites.findOne().where({ id: id, token: token }).done(function(err, invite) {
			if(invite){
				res.json(invite);
			}else{
				res.json('No user was found', 400);
			}
		});
	},
	request: function(req, res){
		Invites.create(req.body).done(function (err, invite) {
			if ( err ) {
				res.json(err, 400);
			}
			else {
				EmailServices.request(invite, function(error, response){
					if(error){
						console.log(error);
						res.send(error);
					}else{
						res.send("Message sent: " + response, 200);
					}
				});
				// res.json(invite, 200);
			}
		});
	},
	confirm: function(req, res){
		var id = req.param('id');
		Invites.findOne(id).done(function(err, invite){
			invite = _.extend(invite, req.body);
			invite.status = 2;
			invite.save(function(err) {
				if ( err ) {
					res.json(err, 400);
				}
				else {
					res.json(invite, 200);
				}
			});
		});
	},
/**
 * Overrides for the settings in `config/controllers.js`
 * (specific to HomeController)
 */
 _config: {}


};
