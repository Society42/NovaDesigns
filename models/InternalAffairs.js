const mongoose = require('mongoose');

const iaSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  discordId: { type: String, required: true, unique: true },
  rank: { type: String, default: "IA-Trial Agent" },
  status: { type: String, default: "Active" },
  steamId: { type: String, default: "" },
  strikes: { type: Number, default: 0 },
  division: { type: String, default: "Internal Affairs" },
  avatarURL: { type: String },
});

module.exports = mongoose.model('IA', iaSchema);
