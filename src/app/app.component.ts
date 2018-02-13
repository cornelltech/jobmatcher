import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import { UsersProvider } from '../providers/users/users';

import { User } from '../models/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav:Nav;
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    location: Location,
    auth: AuthProvider,
    userProvider: UsersProvider, ) {

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        // statusBar.styleDefault();
        // splashScreen.hide();

        const path = location.path();
        const routeToInvitation = path.includes('invitation');

        auth.hasValidSession$
          .subscribe((payload:boolean) => {
            if(routeToInvitation) {
              // pass - let the DeepLinks do what they do
            }else if(payload) {
              // has valid session
              const uid:string = auth.afAuth.auth.currentUser.uid;
              userProvider.lookup$(uid)
                .take(1)
                .subscribe((payload:User) => {
                  this.nav.setRoot(TabsPage, {
                    me: payload
                  });
                });
            }else{
              this.rootPage = 'login-page';
            }
          });

      });
  }
}
