
var nodemailer = require("nodemailer");
var fs =  require('fs');

var getHtml = function(templateName, data) {
	var encoding, templateContent, templatePath;
	templatePath = "./views/emails/" + templateName + ".html";
	templateContent = fs.readFileSync(templatePath, encoding = "utf8");
	return _.template(templateContent, data, {
		interpolate: /\{\{(.+?)\}\}/g
	});
};

// var smtpTransport = nodemailer.createTransport("SMTP", {
// 	host: "server.vetheroes.co",
// 	secureConnection: true,
// 	port: 465,
// 	auth: {
// 		user: "main@vetheroes.co",
// 		pass: "!Mz*;tDw!b6K"
// 	}
// });
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "vetheroes@gmail.com",
		pass: "!Mz*;tDw!b6K"
	}
});


var EmailServices = {
	request: function(data, callback){
    var html = getHtml('request', data);

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: 'Vet Heroes <main@vetheroes.co>',
			to: data.email,
			subject: 'Hemos recibido tu solicitud de inscripción',
			text: 'Hola',
			html: html
		};

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, callback);
	}
};

module.exports = EmailServices;