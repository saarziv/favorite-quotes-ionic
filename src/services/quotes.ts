import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {QuoteSchemaInterface} from "../app/interfaces/quote-schema";
import {QuoteInterface} from "../app/interfaces/quote";
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class QuotesService {
  url:string = "http://localhost:3000/";
  constructor(private http:HttpClient) {}

  getQuotes(): Observable<QuoteSchemaInterface[]> {
    return this.http.get<QuoteSchemaInterface[]>(this.url + "quotes");
    // return this.http.get(this.url).toPromise()
  }

  getFavoriteQuotes() :Observable<QuoteInterface[]> {
    return this.http.get<QuoteInterface[]>(this.url + "favorites");
  }

  postFavoriteQuotes(quoteCollection,quote:QuoteInterface) : Observable<QuoteInterface> {

    //idk why this does not work..
    // await this.updateQuoteToFavorite(quoteCollection,quote);
    // return this.http.post<any>(this.url + "favorites",quote);

    //chaining Observerables with flatMap operator (notice the import!).

    return this.updateQuoteToFavorite(quoteCollection,quote)
      .flatMap(() => this.http
        .post<Observable<QuoteInterface>>(this.url + "favorites",quote));
  }

  updateQuoteToFavorite(quoteCollection,quote) :any {
    return this.http.patch(this.url + `quotes\\${quoteCollection._id}`,quote);
  }

  removeFavoriteQuote(quoteCollection,quote) : Observable<QuoteInterface> {

    return this.updateQuoteToFavorite(quoteCollection,quote)
      .flatMap(() =>
        this.http.delete<Observable<QuoteInterface>>(`${this.url}favorites\\${quote._id}`));
  }

  getQuoteCollection(quoteId :string) {
    return this.http.get(`${this.url}quotes\\${quoteId}`);
  }

  getQuoteCollectionByQuoteId(quote:QuoteInterface) {
    return this.http.get(`${this.url}quotes\\quote\\${quote._id}`);
  }

  // getFavoriteQuote(quote:QuoteInterface) :Observable<any> {
  //   console.log(this.url);
  //   return this.http.get<Observable<any>>(`${this.url}favorites\\${quote._id}`);
  // }






}
