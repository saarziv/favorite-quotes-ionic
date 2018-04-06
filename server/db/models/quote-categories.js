const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({

  category :{
    required:true,
    trim:true,
    type:String,
  },
  quotes :[{

    person : {
      required:false,
      type:String
    },
    text :{
      required:true,
      type:String
    }
  }],
  icon: {
    type:String
  }

});

const Quotes = mongoose.model('quotes',QuoteSchema);

module.exports = { Quotes };
