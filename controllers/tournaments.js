const { response } = require('express');
const Tournament = require('../models/Tournament');

const getTournaments = async (req, res = response) => {
	const tournamentId = req.params.id;
	const tournament = await Tournament.findById(tournamentId).populate(
		'users',
		'name'
	);

	res.json({
		ok: true,
		tournament,
	});
};

const createTournament = async (req, res = response) => {
	try {
		tournament = new Tournament(req.body);
		tournament.users = [req.uid];
		const tournamentSaved = await tournament.save();

		res.json({
			ok: true,
			tournament: tournamentSaved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact administrator',
		});
	}
};

const updateTournament = async (req, res = response) => {
	const tournamentId = req.params.id;
	const uid = req.uid;

	try {
		const tournament = await Tournament.findById(tournamentId);

		console.log(tournament);
		if (!tournament) {
			return res.status(404).json({
				ok: false,
				msg: 'Tournament id doesn`t exist',
			});
		}

		const newTournament = {
			...req.body,
			users: [...tournament.users, uid],
		};

		const updatedTournament = await Tournament.findByIdAndUpdate(
			tournamentId,
			newTournament,
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			tournament: updatedTournament,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact administrator',
		});
	}
};

module.exports = { getTournaments, createTournament, updateTournament };
