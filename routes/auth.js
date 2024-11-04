/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createUser, signInUser, renewToken } = require('../controllers/auth');
const { validarCampos, validarJWT } = require('../middlewares');

router.post(
	'/new',
	[
		check('name', 'El nombre es obligario').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password es debe de ser de 6 caracteres'
		).isLength({ min: 6 }),
		validarCampos,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'El nombre debe de ser obligatorio').not().isEmpty(),
		check(
			'password',
			'El password debe de tener mas de 6 caracteres'
		).isLength({ min: 6 }),
		validarCampos,
	],
	signInUser
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
