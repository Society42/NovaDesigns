const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true }, 
  discordId: { type: String, required: true, unique: true }, 
  rank: { type: String, default: "Cadet" },                
  status: { type: String, default: "Active" },               
  steamId: { type: String, default: "" },                  
  strikes: { type: Number, default: 0 },                     
  division: { type: String, default: "Police Department" },  
  avatarURL: { type: String },            
  tier: {                                                    
    type: String,
    default: 'Bronze Command'
  }
});

module.exports = mongoose.model('User', userSchema);
