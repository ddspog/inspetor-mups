import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './socially.html';

import {
    name as RecordsList
} from '../recordsList/recordsList';
import {
    name as RecordDetails
} from '../recordDetails/recordDetails';
import {
    name as Navigation
} from '../navigation/navigation';
import {
    name as Auth
} from '../auth/auth';

class Socially {}

const name = 'socially';

// Create a module
export default angular.module(name, [
        angularMeteor,
        ngMaterial,
        ngSanitize,
        uiRouter,
        RecordsList,
        RecordDetails,
        Navigation,
        Auth
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

    $urlRouterProvider.otherwise('/records');

    const googleIconPath = '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
        .defaultFontSet('mdi');

    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
            'default': '700',
            'hue-1': '500',
            'hue-2': '100'
        })
        .accentPalette('amber', {
            'default': 'A200'
        });
}

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('records');
            }
        });
}
