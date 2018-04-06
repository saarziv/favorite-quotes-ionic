import {Injectable} from "@angular/core";

@Injectable()
export class SettingsService {

  private alternateBackground:boolean = false;

  setAlternateBackground(value:boolean) :void {
    this.alternateBackground = value;
  }

  getAlternateBackground() :boolean {
    return this.alternateBackground;
  }
}
