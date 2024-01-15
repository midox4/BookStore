const mongoose = require("mongoose");

const BookModelSchema = new mongoose.Schema({

  
  Title: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },
  Likes: [ 
    {
      userId : {
      type: mongoose.Schema.Types.ObjectId,
          ref: "USER",
          required: true,
    }
    } 
]

},{timestamps:true});

module.exports.BookModel = mongoose.model("BookModel", BookModelSchema);
