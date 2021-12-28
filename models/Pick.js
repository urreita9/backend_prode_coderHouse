const { Schema, model } = require('mongoose');

const PickSchema = Schema({
	group: {
		type: String,
		required: true,
	},
	matchNumber: {
		type: String,
		required: true,
	},
	home_team: {
		type: String,
		required: true,
	},
	away_team: {
		type: String,
		required: true,
	},
	home_result: {
		type: String,
		required: true,
	},
	away_result: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

PickSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();

	object.id = _id;
	return object;
});

module.exports = model('Pick', PickSchema);
