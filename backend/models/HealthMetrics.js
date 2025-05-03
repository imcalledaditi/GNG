const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  height: Number, // cm
  weight: Number, // kg
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthMetrics', healthSchema);
