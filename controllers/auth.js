const { response } = require('express');
const bcrypt = require('bcryptjs');
const sendEmail = require('../helpers/nodeMailer');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email: email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'Email already exists',
			});
		}
		user = new User(req.body);

		//Encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//JWT
		const token = await generateJWT(user.id, user.name);

		//Email verification
		const message = `Please, click on this link to confirm your account: ${process.env.BASE_URL}/user/verify/${user.id}/${token}`;
		await sendEmail(user.email, 'Verify Email Prode 2022', message);

		console.log('Email sent');

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
			verified: false,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact administrator',
		});
	}
};

const verifyUser = async (req, res) => {
	try {
		const user = await User.findOne({ uid: req.params.id });
		if (!user) return res.status(400).send('Invalid link');

		const token = await Token.findOne({
			token: req.params.token,
		});
		if (!token) return res.status(400).send('Invalid link');

		await User.updateOne({ ...user, verified: true });

		res.send('email verified sucessfully');
	} catch (error) {
		res.status(400).send('An error occured');
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong email or password',
			});
		}

		//Confirm passwords
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong email or password',
			});
		}

		//JWT
		const token = await generateJWT(user.id, user.name);

		res.status(200).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
			verified: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact administrator',
		});
	}
};

const renewToken = async (req, res) => {
	const { uid, name } = req;

	//JWT
	const token = await generateJWT(uid, name);
	res.json({
		ok: true,
		token,
		uid,
		name,
	});
};

module.exports = { createUser, loginUser, verifyUser, renewToken };
