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
    Parties
} from '../../../api/parties/index';
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

        this.subscribe('parties', () => [{}, this.getReactively('searchText')]);
        this.subscribe('users');

        this.helpers({
            parties() {
                let cursor = Parties.find({}, {
                    sort: this.getReactively('sort')
                });

                this.setPartiesNumber(cursor.count());

                let array = cursor.fetch();
                let skip = parseInt((this.getReactively('page') - 1) * this.perPage);
                let perPage = parseInt(this.perPage);

                return array.filter((doc, index) => {
                    return index >= skip && index < skip + perPage;
                });
            },
            partiesCount() {
                let n = 0;

                if(navigator.onLine && Meteor.status().connected){
                    n = Counts.get('numberOfParties');
                } else {
                    let number = this.getReactively('partiesNumber');
                    if(!!number){
                        n = number;
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

    setPartiesNumber(number) {
        this.$bindToContext(() => {
            this.partiesNumber = number;
        })();
    }
}

const name = 'partiesList';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        utilsPagination,
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
