import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import template from './recordDetails.html';
import {
    Records
} from '../../../api/records/index';

import {
    AfterCallLog
} from '../../callbacks/log/logCallback';

class RecordDetails {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.recordId = $stateParams.recordId;

        this.subscribe('records');
        this.subscribe('users');

        this.helpers({
            record() {
                return Records.findOne({
                    _id: $stateParams.recordId
                });
            },
            users() {
                return Meteor.users.find({})
            },
            isLoggedIn() {
                return !!Meteor.userId();
            }
        });
    }

    canInvite() {
        if (!this.record) {
            return false;
        }

        return !this.record.public && this.record.owner === Meteor.userId();
    }

    save() {
        Records.update({
            _id: this.record._id
        }, {
            $set: {
                name: this.record.name,
                description: this.record.description,
                public: this.record.public,
                location: this.record.location
            }
        }, AfterCallLog({
            done: 'Done!',
            error: 'Oops, unable update the record!'
        }));
    }
}

const name = 'recordDetails';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ]).component(name, {
        template,
        controllerAs: name,
        controller: RecordDetails
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('recordDetails', {
        url: '/records/:recordId',
        template: '<record-details></record-details>',
        resolve: {
            currentUser($q) {
                if (Meteor.userId() === null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    });
}
