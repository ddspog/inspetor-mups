import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';

import webTemplate from './web.html';
import mobileTemplate from './mobile.html';

import {
    Parties
} from '../../../api/parties/index';
import { name as PartyUpload
} from '../partyUpload/partyUpload';

import {
    GetSanityAreas
} from '../../modules/sanityAreas/sanityAreas';

class PartyAddForm {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.party = {
            type: {
                area: 0,
                subArea: 0
            }
        };

        this.uploadPicture = undefined;

        this.areas = GetSanityAreas();

        this.helpers({
           subAreaList() {
               var index_area = this.getReactively('party.type.area');

               if(index_area != null && index_area > -1 && index_area < 5) {
                   var area = this.areas[index_area];
                   return area.subAreas;
               } else {
                   return undefined;
               }
           },
           subAreaDescription() {
               var index_area = this.getReactively('party.type.area');
               var index_subArea = this.getReactively('party.type.subArea');

               if(index_subArea){
                   var area = this.areas[index_area];
                   var subArea = area.subAreas[index_subArea];

                   return subArea.description;
               } else {
                   return 'Escolha uma subárea para o problema registrado.';
               }
           }
        });
    }

    learnUpload(upload) {
        this.uploadPicture = upload;
    }

    submit() {
        if (!this.uploader) {
            console.log('Missing uploader on Form.')
        } else {
            this.uploader.start();

            this.party.position = Geolocation.latLng();

            this.party.owner = Meteor.userId();

            Parties.insert(this.party);

            if (this.done) {
                this.done();
            }

            this.reset();
        }
    }

    updateSubArea() {
        this.party.type.subArea = null;
    }

    reset() {
        this.party = {};
    }
}

const name = 'partyAddForm';
const template = Meteor.isCordova ? mobileTemplate : webTemplate;

// Create a module
export default angular.module(name, [
    angularMeteor,
    PartyUpload
]).component(name, {
    template,
    bindings: {
        done: '&?'
    },
    controllerAs: name,
    controller: PartyAddForm
})
