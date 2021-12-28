/* 
    Pick routes 
    host + /api/picks
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidate } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getPicks, createPick, updatePick } = require('../controllers/picks');
const router = Router();

//Validate JWT
router.use(validateJWT);

//Get Picks
router.get('/', [], getPicks);

//Create Pick
router.post(
	'/',
	[
		check('group', 'Group is mandatory').not().isEmpty(),
		check('matchNumber', 'matchNumber is mandatory').not().isEmpty(),
		check('home_team', 'home_team is mandatory').not().isEmpty(),
		check('away_team', 'away_team is mandatory').not().isEmpty(),
		check('home_result', 'home_result is mandatory').not().isEmpty(),
		check('away_result', 'away_result is mandatory').not().isEmpty(),
		fieldValidate,
	],
	createPick
);

//Update Pick
router.put(
	'/:id',
	[
		check('group', 'Group is mandatory').not().isEmpty(),
		check('matchNumber', 'matchNumber is mandatory').not().isEmpty(),
		check('home_team', 'home_team is mandatory').not().isEmpty(),
		check('away_team', 'away_team is mandatory').not().isEmpty(),
		check('home_result', 'home_result is mandatory').not().isEmpty(),
		check('away_result', 'away_result is mandatory').not().isEmpty(),
		fieldValidate,
	],
	updatePick
);

module.exports = router;
