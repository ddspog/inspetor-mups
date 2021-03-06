import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './recordCard.html';

import {
    Images, Thumbs
} from '../../../api/images/index';
import {
    name as RecordRemove
} from '../recordRemove/recordRemove';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';
import {
    name as SanityProblemTypeFilter
} from '../../filters/sanityProblemType/sanityProblemTypeFilter';
import {
    GetSanityAreas
} from '../../modules/sanityAreas/sanityAreas';

/**
 *  RecordCard Component
 */
class RecordCard {

    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.updateTries = 0;

        this.helpers({
            getPicture(){
                if(!!this.getReactively('id')) {
                    let picture = Images.findOne({
                        record: this.getReactively('id')
                    });
                    if(!!picture) {
                        return picture.bin;
                    } else {
                        return '';
                    }
                }
            },

            getIcon() {
                if(this.getReactively('id')){
                    let type = this.getReactively('type');
                    let areas = GetSanityAreas();

                    if(type && areas){
                        return areas[type.area].icon;
                    }
                }
            }
        });
    }
}

const name = 'recordCard';

// Create a module
export default angular.module(name, [
    angularMeteor,
    RecordRemove,
    MDIIconFilter,
    SanityProblemTypeFilter
]).component(name, {
    template,
    bindings: {
        id: '<',
        name: '<',
        image: '<',
        type: '<',
        hasThumb: '<'
    },
    controllerAs: name,
    controller: RecordCard
});

