const { response } = require('express');

const createUser = (req, res = response) => {
	const { name, email, password } = req.body;

	res.status(201).json({
		ok: true,
		msg: 'register',
		name,
		email,
		password,
	});
};

const loginUser = (req, res) => {
	const { email, password } = req.body;

	//validation errors

	res.status(200).json({
		ok: true,
		msg: 'login',
		email,
		password,
	});
};

const renewToken = (req, res) => {
	res.json({
		ok: true,
		msg: 'renew JWT',
	});
};

module.exports = { createUser, loginUser, renewToken };
