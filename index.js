const express = require('express');
require('dotenv').config();

const app = express();

//Public
app.use(express.static('public'));

//Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
