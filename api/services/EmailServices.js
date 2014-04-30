
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

var smtpTransport = nodemailer.createTransport("SMTP", {
	host: "server.vetheroes.co", // hostname
	secureConnection: true, // use SSL
	port: 465, // port for secure SMTP
	auth: {
		user: "main@vetheroes.co",
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
			subject: 'Hemos recibido tu inscripción',
			text: 'Hola',
			html: html
		};

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, callback);
	}
};

module.exports = EmailServices;