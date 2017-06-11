import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import template from './password.html';

class Password {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            email: ''
        };
        this.error = '';
    }

    reset() {
        Meteor.call('forgotPasswordEmail', this.credentials.email, (err, res) => {
            if(!!err) {
                this.setError(err);
            } else {
                this.$state.go('login');
            }
        });
    }

    setError(err) {
        this.$bindToContext(() => {
            this.error = err.reason || err;
        })();
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
