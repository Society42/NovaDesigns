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

userSchema.post('save', async function (doc, next) {
  if (doc.isNew) {
    try {
      const exists = await CadetList.findOne({ discordId: doc.discordId });
      if (!exists) {
        await CadetList.create({ discordId: doc.discordId });
        console.log(`Added ${doc.discordId} to CadetList.`);
      }
    } catch (err) {
      console.error('Error adding to CadetList:', err);
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
