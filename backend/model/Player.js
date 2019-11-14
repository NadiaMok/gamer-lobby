const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Player = new Schema({
    player: {
        type: String
    },
    rank: {
        type: Number
    },
    score: {
        type: Number
    },
    time: {
        type: String //change to time format
    },
    gamesPlayed: {
        type: Array
    }
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player)