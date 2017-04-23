import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Headers, Http, URLSearchParams} from "@angular/http";
import {GooglePlus} from "@ionic-native/google-plus";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events: any;

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private http: Http) {
    let clientId = "374191041786-rkapv68dh79mji0n7q0q95j9b54rngmg.apps.googleusercontent.com";
    googlePlus
      .login({
        "scopes": "https://www.googleapis.com/auth/calendar.readonly",
        "webClientId": clientId,
        "offline": true
      })
      .then(login => {
        let body = new URLSearchParams();
        body.set("code", login.serverAuthCode);
        body.set("client_id", clientId);
        body.set("client_secret", "TEyKwBgPFmIx8rftqYRxj6Kb");
        body.set("grant_type", "authorization_code");
        http
          .post("https://www.googleapis.com/oauth2/v4/token", body)
          .subscribe(token => http
            .get(
              "https://www.googleapis.com/calendar/v3/calendars/sira20nselu48ng0e3udi9tpe8@group.calendar.google.com/events"
              + "?singleEvents=true"
              + "&orderBy=startTime"
              + `&timeMin=${new Date().toISOString()}`,
              {headers: new Headers({"Authorization": `Bearer ${token.json().access_token}`})}
            )
            .subscribe(events => console.log(this.events = events.json().items))
          )
      })
  }

}
