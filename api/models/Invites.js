/**
 * Invites
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

		name: 'string',
		email: 'email',
		tel: 'string',
		token: 'string',
		json: 'string'

  },

	beforeCreate: function (attrs, next) {
		var randomToken = require('random-token');
		attrs.token = randomToken(16);
		next();
	}

};
