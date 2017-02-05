import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import webTemplate from './web.html';
import { Register as RegisterWeb } from './web';
import mobileTemplate from './mobile.html';
import { Register as RegisterMobile } from './mobile';

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

const name = 'register';

const template = Meteor.isCordova ? mobileTemplate : webTemplate;
const controller = Meteor.isCordova  ? RegisterMobile : RegisterWeb;

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        MDIIconFilter
    ])
    .component(name, {
        template,
        controller,
        controllerAs: name
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
