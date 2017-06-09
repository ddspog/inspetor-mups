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

class Register {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.isStepTwo = false;
        this.credentials = {
            profile: {
                name: ''
            },
            password: '',
            phone: '+55'
        };
        this.verificationCode = '';
        this.error = '';
    }

    verifyPhone() {
        Accounts.createUserWithPhone(this.credentials, this.$bindToContext((err) => {
            if(err) {
                // display error and reason
                this.error = err.reason || err;
            } else {
                this.error = '';
                requestVerification();
            }
        }));
    }

    requestVerification() {
        Accounts.requestPhoneVerification(this.credentials.phone, this.$bindToContext((err) => {
            if (err) {
                // display also reason of Meteor.Error
                this.error = err.reason || err;
            } else {
                this.error = '';
                // move to code verification
                this.isStepTwo = true;
            }
        }));
    }

    verifyCode() {
        Accounts.verifyPhone(this.credentials.phone, this.verificationCode, this.$bindToContext((err) => {
            if (err) {
                if(Accounts.isPhoneVerified) {
                    // redirect to records list
                    this.$state.go('records');
                } else {
                    this.error = err.reason || err;
                }
            } else {
                // redirect to records list
                this.$state.go('records');
            }
        }));
        /*
         if (logged) {
         Accounts.changePassword('', this.credentials.password, this.$bindToContext((err) => {
         if (err) {
         if(Accounts.isPhoneVerified) {
         // redirect to records list
         this.$state.go('records');
         } else {
         this.error = err.reason || err;
         }
         } else {
         // redirect to records list
         this.$state.go('records');
         }
         }
         })); */
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
        controller: Register,
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
