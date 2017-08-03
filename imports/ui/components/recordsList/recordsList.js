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

import recordsListTemplate from './recordsList.html';
import pageButtonTemplate from './pageButton.html';

import {
    Records
} from '../../../api/records/index';
import {
    name as RecordAddButton
} from '../recordAddButton/recordAddButton';
import {
    name as RecordCreator
} from '../recordCreator/recordCreator';
import {
    name as RecordCard
} from '../recordCard/recordCard';

/**
 *  RecordsList Component
 */
class RecordsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.searchString = '';

        this.subscribe('records', () => [{}, this.getReactively('searchText')]);
        this.subscribe('users');

        this.helpers({
            records() {
                let cursor = Records.find({}, {
                    sort: this.getReactively('sort')
                });

                this.setRecordsNumber(cursor.count());

                let array = cursor.fetch();
                let skip = parseInt((this.getReactively('page') - 1) * this.perPage);
                let perPage = parseInt(this.perPage);

                return array.filter((doc, index) => {
                    return index >= skip && index < skip + perPage;
                });
            },
            recordsCount() {
                let n = 0;

                if(navigator.onLine && Meteor.status().connected){
                    n = Counts.get('numberOfRecords');
                } else {
                    let number = this.getReactively('recordsNumber');
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

    isOwner(record) {
      return this.isLoggedIn && record.owner === this.currentUserId;
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }

    setRecordsNumber(number) {
        this.$bindToContext(() => {
            this.recordsNumber = number;
        })();
    }
}

const name = 'recordsList';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        utilsPagination,
        RecordAddButton,
        RecordCreator,
        RecordCard
    ]).component(name, {
        template: recordsListTemplate,
        controllerAs: name,
        controller: RecordsList
    })
    .config(config);

function config($stateProvider, paginationTemplateProvider) {
    'ngInject';

    $stateProvider
        .state('records', {
            url: '/records',
            template: '<records-list></records-list>'
        });

    paginationTemplateProvider.setString(pageButtonTemplate);
}
