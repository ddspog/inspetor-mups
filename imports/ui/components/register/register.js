import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Accounts
} from 'meteor/accounts-base';

import template from './register.html';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import MonitorProvider from '../../services/monitor/monitor';

import {
    SocialGate
} from '../../classes/socialGate/socialGate';

import {
    AfterLogInout
} from '../../callbacks/redirect/redirectCallback';

class Register extends SocialGate {
    constructor($scope, $reactive, $state) {
        super($scope, $reactive, $state);
    }

    register() {
        Accounts.createUser(this.credentials,
            this.$bindToContext(AfterLogInout(this, 'parties'))
        );
    }
}

const name = 'register';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        MDIIconFilter
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Register
    })
    .config(config)
    .service('Monitor', MonitorProvider)
    .run(run);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('register', {
        url: '/register',
        template: '<register></register>'
    });
}

// Fix to https://github.com/angular/material/issues/1376
function run(Monitor) {
    'ngInject';

    Monitor.whenAutofill('input.fix-float', (elem) => {
        elem.parent().addClass('md-input-has-value');
    });
}
