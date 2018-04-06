const mongoose = require('mongoose');
const { FavoriteQuotesSchema }= require('./favorite-quotes');

const QuoteCategoriesSchema = mongoose.Schema({

  category :{
    required:true,
    trim:true,
    type:String,
  },
  quotes :[FavoriteQuotesSchema],
  icon: {
    type:String
  },
  _id: {
    type:mongoose.Schema.Types.ObjectId,
    auto:true
  }
});

const QuotesCategories = mongoose.model('quotes',QuoteCategoriesSchema );

module.exports = { QuotesCategories };
