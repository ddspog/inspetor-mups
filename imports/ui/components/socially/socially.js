import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';
import 'ionic-sdk/release/css/ionic.css';

import { Meteor } from 'meteor/meteor';

import webTemplate from './web.html';
import mobileTemplate from './mobile.html';

import {
    name as PartiesList
} from '../partiesList/partiesList';
import {
    name as PartyDetails
} from '../partyDetails/partyDetails';
import {
    name as Navigation
} from '../navigation/navigation';
import {
    name as Auth
} from '../auth/auth';

class Socially {}

const name = 'socially';
const template = Meteor.isCordova ? mobileTemplate : webTemplate;

// Create a module
export default angular.module(name, [
        angularMeteor,
        ngMaterial,
        ngSanitize,
        uiRouter,
        PartiesList,
        PartyDetails,
        Navigation,
        Auth,
        'accounts.ui',
        'ionic'
    ]).component(name, {
        template,
        controllerAs: name,
        controller: Socially
    })
    .config(config)
    .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/parties');

    const googleIconPath = '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
        .defaultFontSet('mdi');

    if (Meteor.isCordova) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
              'default': '700',
              'hue-1': '500',
              'hue-2': '100'
            })
            .accentPalette('amber', {
              'default': 'A200'
            });
    } else {
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-orange', {
              'default': '700',
              'hue-1': '500',
              'hue-2': '100'
            })
            .warnPalette('blue')
            .accentPalette('red', {
              'default': 'A200'
            });
    }
}

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('parties');
            }
        });
}
