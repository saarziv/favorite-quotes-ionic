import {Injectable} from "@angular/core";
import {QuoteInterface} from "../app/interfaces/quote";
import 'rxjs/add/operator/mergeMap';
import {QuotesService} from "./quotes";

@Injectable()
export class QuotesCommonCallsService {

  constructor(private quoteService:QuotesService){}

  removeFromFavorite(quote:QuoteInterface) {
    this.getQuoteCollectionByQuoteId(quote).subscribe((qColl) =>
      this.quoteService.removeFavoriteQuote(qColl,quote)
        .subscribe());
  }

  getQuoteCollectionByQuoteId(quote:QuoteInterface) {
    return this.quoteService.getQuoteCollectionByQuoteId(quote);

  }
}
