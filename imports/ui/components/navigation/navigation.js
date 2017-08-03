import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    name as Auth
} from '../auth/auth';

import template from './navigation.html';

const name = 'navigation';

// Create a module
export default angular.module(name, [
    angularMeteor,
    Auth
]).component(name, {
    template,
    controllerAs: name
});
