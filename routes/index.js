
/*
 * GET home page.
 */
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "enrique.wx@gmail.com",
		pass: "blackcode_12"
	}
});



exports.index = function(req, res){
  res.render("index");
};

exports.enviaCorreo = function(req, res){
	console.log(req.body);
	smtpTransport.sendMail({
		from: "PosicionLocal <contacto@posicionlocal.com>",
		to: "Saul <enrique_wx@hotmail.com>",
		subject: "Nuevo correo",
		text: "Has recibido un nuevo correo " + req.body.email
	}, function(error, response){
		if(error){
			console.log("error: " + error );
		}else{
			console.log("Mensaje send: " + response.message);
		}
	});
	
  res.render("gracias");
};

exports.platiquemos = function(req, res){
	console.log(req.body);

v1 = req.body.hablar_con_especialista
v2 = req.body.quiero_demostracion
v3 = req.body.quiero_demostracion_res
v4 = req.body.solicito_reunion
v5 = req.body.solicito_reunion_res
v6 = req.body.tengo_pregunta
v7 = req.body.tengo_pregunta_res
v8 = req.body.iniciar_campaña
v9 = req.body.paquete_medida
v10 = req.body.mail

mensaje = "Hablar con especialista: " + v1 + ".\n\n" +
		"Quiero demostracion: " + v2 + ".\n" +
		"Detalles del demo: " + v3 + ".\n\n" +
		"Solicito reunion: " + v4 + ".\n" +
		"Donde se llevara la reunion: " + v5 + ".\n\n" +
		"Tengo pregunta: " + v6 + ".\n" +
		"Que te gustaria saber: " + v7 + "\n\n" +
		"Iniciar campaña: " + v8 + ".\n\n" +
		"Quiero un paquete a la medida: " + v9 + ".\n\n" +
		"Email: " + v10 + ".";

	smtpTransport.sendMail({
		from: "PosicionLocal <contacto@posicionlocal.com>",
		to: "Saul <enrique_wx@hotmail.com>",
		subject: "Nuevo correo",
		text: mensaje
	}, function(error, response){
		if(error){
			console.log("error: " + error );
		}else{
			console.log("Mensaje send: " + response.message);
		}
	});
	
  res.render("gracias");
};