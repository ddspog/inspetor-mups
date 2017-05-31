import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './logoutMessage.html';

const name = 'logoutMessage';

// Create a module
export default angular.module(name, [
    angularMeteor,
]).component(name, {
    template,
    controllerAs: name
});
