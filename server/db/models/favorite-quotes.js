const mongoose = require('mongoose');

const FavoriteQuotesSchema = mongoose.Schema({
  _id: {
    type:mongoose.Schema.Types.ObjectId,
    auto:true
  },
  person:{
    type:String,
    required:true
  },
  text: {
    type:String,
    required:true
  },
  isFavorite: {
    type:Boolean,
    default: false
  }

});

const FavoritesQuotes = mongoose.model('favorites',FavoriteQuotesSchema);


module.exports = { FavoritesQuotes,FavoriteQuotesSchema };
