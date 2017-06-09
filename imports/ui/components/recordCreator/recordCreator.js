import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';

import template from './recordCreator.html';
import {
    name as DisplayNameFilter
} from '../../filters/displayName/displayNameFilter';

/**
 * RecordCreator component
 */
class RecordCreator {
    constructor($scope) {
        'ngInject';

        $scope.viewModel(this);

        this.helpers({
            creator() {
                if(!this.record) {
                    return '';
                }

                const owner = this.record.owner;

                if (Meteor.userId() !== null && owner === Meteor.userId()) {
                    return 'me';
                }

                return Meteor.users.findOne(owner) || 'nobody';
            }
        });
    }
}

const name = 'recordCreator';

// create a module
export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter
]).component(name, {
    template,
    controllerAs: name,
    bindings: {
        record: '<'
    },
    controller: RecordCreator
});
