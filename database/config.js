const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);
	} catch (error) {
		throw new Error('Error a la hora de inicializar la base de datos');
	}
};

module.exports = {
	dbConnection,
};
