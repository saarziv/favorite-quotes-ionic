import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {QuoteInterface} from "../../app/interfaces/quote";
import {QuotesService} from "../../services/quotes";
import {QuotesCommonCallsService} from "../../services/quote-common-calls";


@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage implements OnInit {
  quoteSelected: QuoteInterface;
  quoteRemoved:boolean;
  constructor(private navParams:NavParams
              ,private viewCtrl:ViewController,
              private quoteService:QuotesService,
              private quoteCommonCallsService:QuotesCommonCallsService
  ){}

  ngOnInit() {
    this.quoteSelected = this.navParams.data;
  }

  onCLose() {
    // this.navCtrl.pop();
    this.viewCtrl.dismiss(this.quoteRemoved);
  }
  unFavorite(quote:QuoteInterface) {
    this.quoteCommonCallsService.removeFromFavorite(quote);
    this.quoteRemoved = true;
  }


}
