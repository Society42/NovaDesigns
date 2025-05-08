const mongoose = require('mongoose');

const swatSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  discordId: { type: String, required: true, unique: true },
  rank: { type: String, default: "SWAT Tryout" },
  status: { type: String, default: "Active" },
  steamId: { type: String, default: "" },
  strikes: { type: Number, default: 0 },
  division: { type: String, default: "Swat Department" },
  avatarURL: { type: String },
});

module.exports = mongoose.model('Swat', swatSchema);
