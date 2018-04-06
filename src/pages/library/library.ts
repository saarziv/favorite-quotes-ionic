import {Component, OnInit} from '@angular/core';
import {QuotesService} from "../../services/quotes";
import {QuoteSchemaInterface} from "../../app/interfaces/quote-schema";
import {QuotesPage} from "../quotes/quotes";


@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit {
  allQuotesCollections :QuoteSchemaInterface[];
  quotesPage = QuotesPage;
  constructor(private quotesService:QuotesService) {
  }

  async ngOnInit() {

    this.quotesService.getQuotes().subscribe((q) => this.allQuotesCollections = q)
    // this.allQuotes = await this.quotesService.getQuotes();
  }



}
