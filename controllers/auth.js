const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { genJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: `El usuario ya existe`,
			});
		}

		usuario = new Usuario(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		// Generar nuestro JWT
		const token = await genJWT(usuario.id, usuario.name);

		return res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

const signInUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe con ese email',
			});
		}

		// Confirmar las contraseña
		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Contraseña no valida',
			});
		}

		// Generar nuestro JWT
		const token = await genJWT(usuario.id, usuario.name);

		res.status(200).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

//! RENEW TOKEN = REVALIDAR TOKEN

const renewToken = async (req, res = response) => {
	const { uid, name } = req;

	// Generar un nuevo JWT y retornarlo en esta petición

	const token = await genJWT(uid, name);

	res.json({
		ok: true,
		uid,
		name,
		token,
	});
};

module.exports = {
	createUser,
	signInUser,
	renewToken,
};
