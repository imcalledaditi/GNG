const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  amount: Number, // ml
});

module.exports = mongoose.model('WaterTracker', waterSchema);
