const { response } = require('express');
const Pick = require('../models/Pick');

const getPicks = async (req, res = response) => {
	const picks = await Pick.find().populate('user', 'name');

	res.json({
		ok: true,
		picks,
	});
};

const createPick = async (req, res = response) => {
	const { matchNumber } = req.body;
	try {
		let pick = await Pick.findOne({ matchNumber: matchNumber, user: req.uid });

		if (pick) {
			return res.status(400).json({
				ok: false,
				msg: 'Pick already exists',
			});
		}
		pick = new Pick(req.body);
		pick.user = req.uid;
		const pickSaved = await pick.save();

		res.json({
			ok: true,
			pick: pickSaved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact administrator',
		});
	}
};

const updatePick = async (req, res = response) => {
	const pickId = req.params.id;
	const uid = req.uid;

	try {
		const pick = await Pick.findById(pickId);

		if (!pick) {
			return res.status(404).json({
				ok: false,
				msg: 'Pick id doesn`t exist',
			});
		}
		if (pick.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'User not authorized to update pick',
			});
		}
		const newPick = {
			...req.body,
			user: uid,
		};

		const updatedPick = await Pick.findByIdAndUpdate(pickId, newPick, {
			new: true,
		});

		res.json({
			ok: true,
			pick: updatedPick,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact administrator',
		});
	}
};

module.exports = { getPicks, createPick, updatePick };
