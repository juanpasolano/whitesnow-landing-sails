/**
 * Invites
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'STRING',
            required: true
        },
        contact: {
            type: 'STRING'
        },
        email: {
            type: 'EMAIL',
            required: true
        },
        tel: 'string',
        token: 'string',
        status: 'integer' //1: Invited, 2: Invitation Confirmed, 3: requested invite
    },

    beforeCreate: function (attrs, next) {

        //creating a random token
        var randomToken = require('random-token');
        attrs.token = randomToken(16);

        //if isInvited is not specified, put 0
        if (!attrs.status) {
            attrs.status = 1; //this status means the user has requested an invite
        }

        next();
    }

};
