const mongoose = require('mongoose');

const cadetList = new mongoose.Schema({
    discordId: { type: String }, 
    arrests: { type: Number, default: 0 },
    rideAlongs: { type: Number, default: 0 },
    warrants: { type: Number, default: 0 },
    fines: { type: Number, default: 0 },
    heists: { type: Number, default: 0 }
});

module.exports = mongoose.model('cadetlist', cadetList);
  