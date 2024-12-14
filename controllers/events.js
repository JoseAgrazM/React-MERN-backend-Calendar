const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
	const eventos = await Evento.find().populate('user', 'name');

	res.json({
		ok: true,
		eventos,
	});
};
const crearEvento = async (req, res = response) => {
	// Verificar que tenga el evento
	const evento = new Evento(req.body);

	try {
		// Necesita pasar el uid del usuario que en el evento no viene pero si esta en al request
		evento.user = req.uid;

		const eventoGuardado = await evento.save();

		res.json({
			ok: true,
			evento: eventoGuardado,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Error al guardar Evento, hable con el administrador',
		});
	}
};
const actualizarEvento = async (req, res = response) => {
	const eventoId = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventoId);

		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un evento con ese id',
			});
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene el privilegio de editar este evento',
			});
		}

		const nuevoEvento = {
			...req.body,
			user: uid,
		};

		const eventoActualizado = await Evento.findByIdAndUpdate(
			eventoId,
			nuevoEvento,
			{ new: true }
		);

		res.json({
			ok: true,
			evento: eventoActualizado,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};
const eliminarEvento = async (req, res = response) => {
	const eventoId = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventoId);

		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un evento con ese id',
			});
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene el privilegio de eliminar este evento',
			});
		}
		await Evento.findByIdAndDelete(eventoId);

		res.json({ ok: true });
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
};
