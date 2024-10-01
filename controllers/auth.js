const { response } = require('express');

const createUser = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'registro',
	});
};

const signInUser = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'login',
	});
};

//! RENEW TOKEN = REVALIDAR TOKEN

const renewToken = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'renew',
	});
};

module.exports = {
	createUser,
	signInUser,
	renewToken,
};
