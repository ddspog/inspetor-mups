import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import template from './login.html';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import MonitorProvider from '../../services/monitor/monitor';

const name = 'login';

class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            username: '',
            password: ''
        };
        this.error = '';
    }

    loginUser() {
        Meteor.loginWithPassword(this.credentials.username, this.credentials.password, this.$bindToContext((err) => {
            if (err) {
                // display also reason of Meteor.Error
                this.setError(err);
            } else {
                this.setError('');
                // redirect to records list
                this.$state.go('records');
            }
        }));
    }

    setError(err) {
        this.$bindToContext(() => {
            this.error = err.reason || err;
        })();
    }
}

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    MDIIconFilter
])
    .component(name, {
        template,
        controller: Login,
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
