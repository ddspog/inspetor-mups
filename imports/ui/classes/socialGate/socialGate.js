import {
    AccountsGate
} from '../accountsGate/accountsGate';

import {
    AfterLogInout
} from '../../callbacks/redirect/redirectCallback';

export class SocialGate extends AccountsGate {
    constructor($scope, $reactive, $state) {
        super($scope, $reactive, $state);

        this.credentials.password = '';
    }

    loginGoogle() {
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
        }, AfterLogInout(this, 'parties'));
    }

    loginFacebook() {
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, AfterLogInout(this, 'parties'));
    }
}
