const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

// Cambiamos como se visualiza pero no como se graba en la Base de Datos

EventoSchema.method('toJSON', function() {
	const { _id, __v, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Evento', EventoSchema);
