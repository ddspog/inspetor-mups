import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor'
import {
    Accounts
} from 'meteor/accounts-base'

import {
    Groups
} from '../../../api/groups/index';

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

        this.subscribe('groups');

        this.credentials = {
            profile: {
                group: ''
            },
            email: '',
            username: '',
            password: ''
        };
        this.error = '';
    }

    registerUser() {
        if(this.verifyCode()){
            Accounts.createUser(this.credentials, this.$bindToContext((err) => {
                if(err) {
                    let alreadyExists = new RegExp('/already exists./');
                    let hasUsername = new RegExp('/Username/');
                    let hasEmail = new RegExp('/Email/');

                    if(alreadyExists.test(err.reason)){
                        if(hasUsername.test(err.reason)) {
                            this.setError('Nome de usuário já registrado');
                        } else if (hasEmail.test(err.reason)){
                            this.setError('Email já registrado.');
                        } else {
                            // display error and reason
                            this.setError(err);
                        }
                    } else {
                        // display error and reason
                        this.setError(err);
                    }
                } else {
                    this.setError('');

                    Meteor.call('verifyUserEmail', (err, res) => {});

                    // redirect to records list
                    this.$state.go('records');
                }
            }));
        } else {
            this.setError('Utilize um código válido.');
        }
    }

    verifyCode() {
        let group = Groups.findOne({
            _id: this.credentials.profile.group
        });
        return !!group;
    }

    setError(err) {
        this.$bindToContext(() => {
            this.error = err.reason || err;
        })();
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
