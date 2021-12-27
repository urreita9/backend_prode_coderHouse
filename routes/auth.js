/* 
    User routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidate } = require('../middlewares/field-validators');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const router = Router();

router.post(
	'/new',
	[
		//middlewares
		check('name', 'Name is mandatory').not().isEmpty(),
		check('email', 'Email is mandatory').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({
			min: 6,
		}),
		fieldValidate,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'Email is mandatory').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({
			min: 6,
		}),
		fieldValidate,
	],
	loginUser
);

router.get('/renew', renewToken);

module.exports = router;
