const express = require('express');
const favoritesRouter = express.Router();
const { FavoritesQuotes } = require('../db/models/favorite-quotes');
const { QuotesCategories } = require('../db/models/quote-categories');
const { ObjectID } = require('mongodb');

favoritesRouter.get('/',async(req,res) =>{

  try {
    const allFavoriteQuotes = await FavoritesQuotes.find({});
    res.send(allFavoriteQuotes);
  } catch (e) {
    res.status(400).send(e);
  }

});

favoritesRouter.post('/',async (req,res) => {
  console.log(req.body);
  const favoriteQuoteDoc = new FavoritesQuotes({
    _id :req.body._id,
    person :req.body.person,
    text :req.body.text,
    isFavorite:true
  });
  try {
    const favoriteQuoteSaved = await favoriteQuoteDoc.save();
    console.log(favoriteQuoteSaved);
    res.send(favoriteQuoteSaved);
  } catch (e) {
    res.status(400).send(e);
  }

});

favoritesRouter.delete('/:id',async(req,res) =>{
  console.log("entered delete:id");
  const removeQuoteId = req.params.id;
  if(!ObjectID.isValid(removeQuoteId)) {
    return res.status(400).send(e);
  }
  try {
    const removedQuote = await FavoritesQuotes.findOneAndRemove({_id :removeQuoteId});
    if (!removedQuote) {
      return res.status(404).send(`the id : ${removedQuote} was not found..`);
    }
    res.send(removedQuote);
  } catch (e) {
    return res.status(400).send(e);
  }

});

favoritesRouter.get('/:id',async (req,res) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id )) {
    return res.status(400).send(e);
  }
  try {

    const quoteDoc = await FavoritesQuotes.findById(id);
    if(!quoteDoc) {
      return res.send(false);
    }
    res.send(quoteDoc);

  } catch (e) {

  }
});



module.exports = { favoritesRouter };
