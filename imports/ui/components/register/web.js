import {
    Accounts
} from 'meteor/accounts-base';

import {
    SocialGate
} from '../../classes/socialGate/socialGate';

import {
    AfterLogInout
} from '../../callbacks/redirect/redirectCallback';

export class Register extends SocialGate {
    constructor($scope, $reactive, $state) {
        super($scope, $reactive, $state);
    }

    register() {
        Accounts.createUser(this.credentials,
            this.$bindToContext(AfterLogInout(this, 'parties'))
        );
    }
}
