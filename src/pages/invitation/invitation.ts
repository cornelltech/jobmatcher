import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Invitation } from '../../models/invitation';
import { InvitationsProvider } from '../../providers/invitations/invitations';

/**
 * Generated class for the InvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'invitation-page',
  segment: 'invitation/:code',
})
@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  invitation$: Observable<Invitation>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private invitation: InvitationsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationPage');

    this.invitation$ = this.invitation.invitation$;
    
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  resolveNavParams():void {
    const params = this.navParams.data;
    const code:string = params.get('code');
    this.invitation.lookup(code);
  }

}
