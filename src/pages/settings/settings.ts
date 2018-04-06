import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoritePage} from "../favorite/favorite";
import {SettingsService} from "../../services/settings";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  favoritePage = FavoritePage;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private settingsService:SettingsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onToggle(changedVal) {
    console.log(changedVal);
    this.settingsService.setAlternateBackground(changedVal);
  }

  getCheckedVal() {
    return this.settingsService.getAlternateBackground();
  }

}
