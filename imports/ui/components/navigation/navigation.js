import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    name as Auth
} from '../auth/auth';

import webTemplate from './web.html';
import mobileTemplate from './mobile.html';

const name = 'navigation';
const template = Meteor.isCordova ? mobileTemplate : webTemplate;

// Create a module
export default angular.module(name, [
    angularMeteor,
    Auth
]).component(name, {
    template,
    controllerAs: name
});
