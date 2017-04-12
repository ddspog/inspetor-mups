import {
    Meteor
} from 'meteor/meteor';

import {
    SocialGate
} from '../../classes/socialGate/socialGate';

import {
    AfterLogInout
} from '../../callbacks/redirect/redirectCallback';

export class Login extends SocialGate {
    constructor($scope, $reactive, $state) {
        super($scope, $reactive, $state);
    }

    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext(AfterLogInout(this, 'parties'))
        );
    }
}