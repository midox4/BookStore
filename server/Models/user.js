const mongoose = require("mongoose");

const USERSchema = new mongoose.Schema({

  
  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Password: {
    type: String,
    required: true,
  },
  Photo :{
    type:String,
    required: false
  }

},{timestamps:true});

module.exports.USER = mongoose.model("USER", USERSchema);
