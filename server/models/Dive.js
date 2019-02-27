const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diveSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  diveType: { type: String, required: false, enum: ['Scuba', 'Apnea'] },
  date: { type: Date },
  visibility: { type: Number },
  depth: { type: Number, required: true },
  location: { type: [Number], required: true },
  _owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Dive = mongoose.model('Dive', diveSchema);
module.exports = Dive;
