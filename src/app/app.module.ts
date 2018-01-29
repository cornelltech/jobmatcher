import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JobsProvider,
    UsersProvider,
    CompaniesProvider
  ]
})
export class AppModule {}
