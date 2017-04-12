import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import webTemplate from './web.html';
import {Login as LoginWeb} from './web';
import mobileTemplate from './mobile.html';
import {Login as LoginMobile} from './mobile';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import MonitorProvider from '../../services/monitor/monitor';

const name = 'login';

const template = Meteor.isCordova ? mobileTemplate : webTemplate;
const controller = Meteor.isCordova ? LoginMobile : LoginWeb;

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

    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>'
    });
}

// Fix to https://github.com/angular/material/issues/1376
function run(Monitor) {
    'ngInject';

    Monitor.whenAutofill('input.fix-float', (elem) => {
        elem.parent().addClass('md-input-has-value');
    });
}
