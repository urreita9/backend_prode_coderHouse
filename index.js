const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//Public
app.use(express.static('public'));

//Body Parse
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/picks', require('./routes/picks'));
app.use('/api/tournaments', require('./routes/tournaments'));

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
