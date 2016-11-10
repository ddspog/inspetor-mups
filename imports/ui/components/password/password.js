import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Accounts
} from 'meteor/accounts-base';

import template from './password.html';

import {
    AccountsGate
} from '../../classes/accountsGate/accountsGate';

import {
    AfterLogInout
} from '../../callbacks/redirect/redirectCallback';

class Password extends AccountsGate {
    constructor($scope, $reactive, $state) {
        super($scope, $reactive, $state);
    }

    reset() {
        Accounts.forgotPassword(this.credentials, this.$bindToContext(AfterLogInout(this, 'login')));
    }
}

const name = 'password';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Password
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('password', {
        url: '/password',
        template: '<password></password>'
    });
}
