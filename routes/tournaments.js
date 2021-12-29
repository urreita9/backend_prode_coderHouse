/* 
    Tournament routes 
    host + /api/tournaments
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidate } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
	getTournaments,
	createTournament,
	updateTournament,
} = require('../controllers/tournaments');
const router = Router();

//Validate JWT
router.use(validateJWT);

//Get Picks
router.get('/', getTournaments);

//Create Pick
router.post(
	'/',
	[
		check('name', 'Tournament Name is mandatory').not().isEmpty(),
		fieldValidate,
	],
	createTournament
);

//Update Pick
router.put('/:id', updateTournament);

module.exports = router;
