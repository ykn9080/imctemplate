var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = {};

const allpurposeSchema = new Schema({
  title: String,
  desc: String,
  formid: String,
  data: Schema.Types.Mixed,
  author: Schema.Types.Mixed,
});

models.Allpurpose = mongoose.model("Allpurpose", allpurposeSchema);

module.exports = models;
