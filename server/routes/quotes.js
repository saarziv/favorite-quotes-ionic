const express = require('express');
const quotesRouter = express.Router();
const { QuotesCategories } = require('../db/models/quote-categories');
const  { FavoriteQuotesSchema } = require('../db/models/favorite-quotes');
const { ObjectID } = require('mongodb');
// const  = require('mongodb');


quotesRouter.get('/',async (req,res) => {
  try {
    const allQuotesCategories = await QuotesCategories.find({});
    res.send(allQuotesCategories);
  } catch(e) {
    res.status(400).send(e);
  }

});



quotesRouter.post('/',async (req,res) => {
  const quoteCategoryDoc = new QuotesCategories({
    category:req.body.category,
    quotes: req.body.quotes,
    icon: req.body.icon
  });
  try {
    const docSaved = await quoteCategoryDoc.save();
    res.send(docSaved);
  } catch (e) {
    res.status(400).send(e);
  }

});

quotesRouter.patch('/:id',async(req,res) => {
  const quotesCategoryId = req.params.id;
  const quote = req.body;
  const quoteId = quote._id;

  if(!ObjectID.isValid(quotesCategoryId)) {
    return res.status(404).send(`the id:${quotesCategoryId} was not found ...`);
  }
  try {

    await QuotesCategories.findOneAndUpdate({
      "_id":quotesCategoryId,
      "quotes._id":quoteId
    },{
      "$set":{"quotes.$.isFavorite":!quote.isFavorite}
    });
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }

});

quotesRouter.get('/:id',async (req,res) => {

  const id = req.params.id;
  try {

    const quoteCollection = await QuotesCategories.findById(id);
    if(!quoteCollection) {
      return res.status(404).send("the collection was not found...");
    }
    res.send(quoteCollection);
  } catch (e) {
    res.status(400).send(e);
  }
});

quotesRouter.get('/quote/:id',async(req,res) => {
  console.log("welcome");
  const id = req.params.id;
  try {

    const quoteCollection = await QuotesCategories.find({"quotes._id":ObjectID(id)});
    if(!quoteCollection) {
      return res.status(404).send("the collection was not found...");
    }
    res.send(quoteCollection[0]);
  } catch (e) {
    res.status(400).send(e);
  }


});

quotesRouter.get('/favorites',async (req,res) => {
  try {
    const allFavoritesQuotes = await QuotesCategories
      .find({"quotes.isFavorite" :true});

    console.log(allFavoritesQuotes);
    res.send(allFavoritesQuotes);
  } catch(e) {
    res.status(400).send(e);
  }

});

module.exports = {quotesRouter};
