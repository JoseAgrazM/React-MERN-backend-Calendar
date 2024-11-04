/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();
const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/events');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

// Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear evento
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'La fecha de inicio es obligatoria').custom(isDate),
		check('end', 'La fecha de finalización es obligatoria').custom(isDate),
		validarCampos,
	],
	crearEvento
);

// Actualizar evento
router.put(
	'/:id',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'La fecha de inicio es obligatoria').custom(isDate),
		check('end', 'La fecha de finalización es obligatoria').custom(isDate),
		validarCampos,
	],
	actualizarEvento
);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
