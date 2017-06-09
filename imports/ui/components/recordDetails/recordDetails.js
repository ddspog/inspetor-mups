import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import template from './partyDetails.html';
import {
    Records
} from '../../../api/records/index';

import {
    AfterCallLog
} from '../../callbacks/log/logCallback';

class PartyDetails {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.partyId = $stateParams.partyId;

        this.subscribe('records');
        this.subscribe('users');

        this.helpers({
            party() {
                return Records.findOne({
                    _id: $stateParams.partyId
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
        if (!this.party) {
            return false;
        }

        return !this.party.public && this.party.owner === Meteor.userId();
    }

    save() {
        Records.update({
            _id: this.party._id
        }, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                public: this.party.public,
                location: this.party.location
            }
        }, AfterCallLog({
            done: 'Done!',
            error: 'Oops, unable update the party!'
        }));
    }
}

const name = 'partyDetails';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ]).component(name, {
        template,
        controllerAs: name,
        controller: PartyDetails
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('partyDetails', {
        url: '/records/:partyId',
        template: '<party-details></party-details>',
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
