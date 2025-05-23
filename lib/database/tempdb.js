const mongoose = require("mongoose");
const TempDb = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: "VRT"
  },
  creator: {
    type: String,
    default: "MX-GΔMΞCØDΞR"
  },
  data: {
    type: Object,
    default: {}
  }
});
const dbtemp = mongoose.model("dbtemp", TempDb);
module.exports = {
  dbtemp
};
