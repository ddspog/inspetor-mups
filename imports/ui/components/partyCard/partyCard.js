import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyCard.html';

import {
    Images, Thumbs
} from '../../../api/images/index';
import {
    name as PartyRemove
} from '../partyRemove/partyRemove';

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
 *  PartyCard Component
 */
class PartyCard {

    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.helpers({
            getPicture(){
                if(this.getReactively('id')) {
                    if(this.getReactively('hasThumb')) {
                        return Thumbs.findOne({
                            originalCollection: 'images',
                            originalId: this.getReactively('image')
                        }).bin;
                    } else {
                        let picture = Images.findOne({
                            _id: this.getReactively('image')
                        });
                        return picture.bin;
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

const name = 'partyCard';

// Create a module
export default angular.module(name, [
    angularMeteor,
    PartyRemove,
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
    controller: PartyCard
});

