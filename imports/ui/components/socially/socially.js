import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './socially.html';
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

// Create a module
export default angular.module(name, [
        angularMeteor,
        ngMaterial,
        uiRouter,
        PartiesList,
        PartyDetails,
        Navigation,
        Auth,
        'accounts.ui'
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

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('parties');
            }
        });
}
