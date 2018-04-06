import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {QuoteInterface} from "../../app/interfaces/quote";
import {QuotesService} from "../../services/quotes";
import {QuotePage} from "../quote/quote";
import {QuotesCommonCallsService} from "../../services/quote-common-calls";
import {SettingsService} from "../../services/settings";

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage  {
  favoritesQuotes :QuoteInterface[];
  constructor(private quoteService: QuotesService
              ,private modalCtrl:ModalController
              ,private quoteCommonCallsService:QuotesCommonCallsService
              ,private settingsService:SettingsService) {
  }

  ionViewWillEnter() {
    this.getFavoriteQuotes();
  }

  getFavoriteQuotes() {
    this.quoteService.getFavoriteQuotes()
      .subscribe((FavoritesQuotes) => this.favoritesQuotes = FavoritesQuotes)
  }


  loadQuoteModal(quote:QuoteInterface) {

    const modal = this.modalCtrl.create(QuotePage,quote);

    modal.onDidDismiss((removed:boolean) =>{
      if(removed){
        // this.getFavoriteQuotes(); this will load all quotes..its better to simply remove whats been removed..like this :
        this.updateLoadedFavoriteQuotes(quote)
      }
    });

    modal.present();
  }
  updateLoadedFavoriteQuotes(quote:QuoteInterface) {
    const position = this.favoritesQuotes.findIndex((quoteEl) => quote._id == quoteEl._id);
    this.favoritesQuotes.splice(position,1);
  }

  removeFavoritesQuotes(quote:QuoteInterface) :void {
    this.quoteCommonCallsService.removeFromFavorite(quote);
    this.updateLoadedFavoriteQuotes(quote);
  }

  getAltBackgroundVal() :string {
    return this.settingsService.getAlternateBackground() ? "altQuoteBackground" : "quoteBackground";
  }

  isAltBackground() {
    return this.settingsService.getAlternateBackground();
  }



}
