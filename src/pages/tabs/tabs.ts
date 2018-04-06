import { Component } from '@angular/core';
import {FavoritePage} from "../favorite/favorite";
import {LibraryPage} from "../library/library";


@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab tabTitle="Favorite" tabIcon="star" [root]="favoritesPage" ></ion-tab>
      <ion-tab tabTitle="Library" tabIcon="star" [root]="libraryPage" ></ion-tab>
    </ion-tabs> 
  `
})
export class TabsPage {
  favoritesPage = FavoritePage;
  libraryPage = LibraryPage;
}
