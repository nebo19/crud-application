const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  city: String,
  address: String,
  phone: String,
});

personSchema.pre('save', function(next) {
  const doc = this;
  mongoose.model('Person').find(function(error, result) {
    if(result?.[result.length - 1]?.id) {
      doc.id = result[result.length - 1].id + 1;
    } else {
      doc.id = 1;
    }
    next();
  });
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
