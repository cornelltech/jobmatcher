import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environment';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { JobsProvider } from '../providers/jobs/jobs';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { UsersProvider } from '../providers/users/users';
import { CompaniesProvider } from '../providers/companies/companies';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    TabsPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    JobsProvider,
    UsersProvider,
    CompaniesProvider
  ]
})
export class AppModule {}
