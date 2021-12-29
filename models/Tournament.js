const { Schema, model } = require('mongoose');

const TournamentSchema = Schema({
	name: {
		type: String,
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
});

TournamentSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();

	object.id = _id;
	return object;
});

module.exports = model('Tournament', TournamentSchema);
