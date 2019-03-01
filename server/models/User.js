const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  weightBelt: { type: Number, required: false },
  experienceLv: { type: String, required: false },
  recordDepth: { type: Number, required: false },
  recordTime: { type: Number, requred: false },
  typeofDiver: { type: String, required: false }

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
