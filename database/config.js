const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('DB online');
	} catch (error) {
		console.log(error);
		throw new Error('Error initializing Database');
	}
};

module.exports = { dbConnection };
