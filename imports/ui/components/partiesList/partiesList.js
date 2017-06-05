import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import {
    Counts
} from 'meteor/tmeasday:publish-counts';
import {
    Meteor
} from 'meteor/meteor';

import partiesListTemplate from './partiesList.html';
import pageButtonTemplate from './pageButton.html';

import {
    Parties, PartiesValues
} from '../../../api/parties/index';
import {
    name as PartiesSort
} from '../partiesSort/partiesSort';
import {
    name as PartyAddButton
} from '../partyAddButton/partyAddButton';
import {
    name as PartyCreator
} from '../partyCreator/partyCreator';
import {
    name as PartyCard
} from '../partyCard/partyCard';

/**
 *  PartiesList Component
 */
class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.searchString = '';

        this.subscribe('parties', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')]);

        this.subscribe('users');

        this.helpers({
            parties() {
                return Parties.find({}, {
                    sort: this.getReactively('sort')
                });
            },
            partiesCount() {
                let n = 0;

                if(navigator.onLine && Meteor.status().connected){
                    n = Counts.get('numberOfParties');
                    Meteor.call('numberPartiesUpdate', n);
                } else {
                    let profile = Meteor.user().profile;
                    if(!!profile){
                       n = profile.numberParties;
                    }
                }

                return n;
            },
            isLoggedIn() {
              return !!Meteor.userId();
            },
            currentUserId() {
              return Meteor.userId();
            }
        });
    }

    isOwner(party) {
      return this.isLoggedIn && party.owner === this.currentUserId;
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'partiesList';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        utilsPagination,
        PartiesSort,
        PartyAddButton,
        PartyCreator,
        PartyCard
    ]).component(name, {
        template: partiesListTemplate,
        controllerAs: name,
        controller: PartiesList
    })
    .config(config);

function config($stateProvider, paginationTemplateProvider) {
    'ngInject';

    $stateProvider
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        });

    paginationTemplateProvider.setString(pageButtonTemplate);
}
