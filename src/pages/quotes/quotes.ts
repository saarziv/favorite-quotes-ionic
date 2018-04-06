import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {QuoteSchemaInterface} from "../../app/interfaces/quote-schema";
import {QuoteInterface} from "../../app/interfaces/quote";
import {QuotesService} from "../../services/quotes";
import {HttpResponse} from "@angular/common/http";


@Component({
  selector: 'page-quote',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quoteCollectionSelected:QuoteSchemaInterface;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl:AlertController,
              private quoteService:QuotesService
              ){}

  ionViewWillEnter() {
      this.quoteService.getQuoteCollection(this.navParams.data)
        .subscribe((quoteColl:QuoteSchemaInterface) =>
          this.quoteCollectionSelected = quoteColl);
    }






  addToFavorites(quote:QuoteInterface) {
    this.quoteService.postFavoriteQuotes(this.quoteCollectionSelected,quote).subscribe();
    //must add this to make the quote variable identical to server
    // (no need to load it again from server)
    quote.isFavorite = true;
  }
  //need to do this...

  removeFromFavorites(quote:QuoteInterface) {
    this.quoteService.removeFavoriteQuote(this.quoteCollectionSelected,quote).subscribe();
    quote.isFavorite = false;

  }


  confirmFavoriteAlert(quote:QuoteInterface) {
    const alert = this.alertCtrl.create({
      title:"Favorite Quote",
      subTitle:"Are you sure ?",
      message:"are you sure you want to favorite this quote ?",
      buttons:[
        {
          text:'Yes, go ahead',
          handler: () => { this.addToFavorites(quote) }
        },
        {
          text:'no, I changed my mind!',
          role: 'cancel',
          handler: () => { console.log("cancelled")}
        }
      ],
    });
    alert.present();

  }

  confirmUnFavoriteAlert(quote:QuoteInterface){
    const alert = this.alertCtrl.create({
      title:"Un favorite Quote",
      subTitle:"Are you sure ?",
      message:"are you sure you want to un favorite this quote ?",
      buttons:[
        {
          text:'Yes, go ahead',
          handler: () => { this.removeFromFavorites(quote) }
        },
        {
          text:'no, I changed my mind!',
          role: 'cancel',
          handler: () => { console.log("cancelled")}
        }
      ],
    });
    alert.present();

  }
}
