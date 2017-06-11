import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import template from './auth.html';

import {
    name as DisplayNameFilter
} from '../../filters/displayName/displayNameFilter';
import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import {
    name as Login
} from '../login/login';
import {
    name as Register
} from '../register/register';
import {
    name as Password
} from '../password/password';

class Auth {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.helpers({
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUser() {
                return Meteor.user();
            }
        });
    }

    logout(callback) {
        Accounts.logout(callback);
    }
}

const name = 'auth';

// create  a module
export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter,
    Login,
    Register,
    Password
]).component(name, {
    template,
    controllerAs: name,
    controller: Auth
});
