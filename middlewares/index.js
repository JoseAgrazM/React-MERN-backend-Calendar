const { validarJWT } = require('./validar-jwt');
const { validarCampos } = require('./validar-campos');

module.exports = {
	validarCampos,
	validarJWT,
};
