var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//only one schema for questions with associated answers to these questions
var WagerSchema = new mongoose.Schema({
		event: String,
		challenger: String,
		outcome_1: String,
		pts_1: Number,
		opponent: String,
		outcome_2: String,
		pts_2: Number,
		event_end_date: String,
		expiry_date: String,
		created_at: { type: Date, default: Date.now },
		status: { type: String, default: 'INITIATED' }, //should be updated

		// after creation
		real_outcome: String,
		resolved_date: Date,
		first_sig: String, //who, what role, what outcome they chose and timing
		second_sig: String, //who, what role, what outcome they chose and timing
		third_sig: String //who, what role, what outcome they chose and timing (potentially optional)

});



// var WagerSchema = new mongoose.Schema({

// 		event: String,
// 		challenger: String,
// 		outcome_1: String,
// 		stakes_1: Number,
// 		challenger_odds: Number,
// 		opponent: String,
// 		outcome_2: String,
// 		stakes_2: Number,
// 		opponent_odds: Number,
// 		moderator: String, //optional
// 		event_end_date: String,
// 		expiry_date: String,
// 		created_at: { type: Date, default: Date.now },
// 		status: { type: String, default: 'SETUP' }, //should be updated
// 		accepted: { type: Number, default: 1 },
		
// 		// after creation
// 		challenger_outcome: [{ outcome: String, time_stamp: { type: Date, default: Date.now } }],
// 		opponent_outcome: [{ outcome: String, time_stamp: { type: Date, default: Date.now } }],
// 		mod_outcome: [{ outcome: String, time_stamp: { type: Date, default: Date.now } }], //optional
// 		real_outcome: [{ outcome: String, time_stamp: { type: Date, default: Date.now } }], //outcome that was agreed upon 
// 		resolved_date: String,
// 		winner: String,
// 		loser: String

// });




mongoose.model('Wager', WagerSchema);