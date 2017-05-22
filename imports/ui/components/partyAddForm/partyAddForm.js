import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';
import {
    Tracker
} from 'meteor/tracker';

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

        this.areas = GetSanityAreas();

        this.helpers({
           subAreaList() {
               let index_area = this.getReactively('party.type.area');

               if(index_area !== null && index_area > -1 && index_area < 5) {
                   let area = this.areas[index_area];
                   return area.subAreas;
               } else {
                   return undefined;
               }
           },
           subAreaDescription() {
               let index_area = this.getReactively('party.type.area');
               let index_subArea = this.getReactively('party.type.subArea');

               if(index_subArea){
                   let area = this.areas[index_area];
                   let subArea = area.subAreas[index_subArea];

                   return subArea.description;
               } else {
                   return 'Escolha uma subárea para o problema registrado.';
               }
           },
           locationFound() {
               return !!this.getReactively('party.position');
           },
           latitude() {
               return this.getReactively('party.position.lat');
           },
           longitude() {
                return this.getReactively('party.position.lng');
           }
        });

        let localization = new ReactiveVar(null);

        Tracker.autorun((computation) => {
           localization.set(Geolocation.latLng());
           if(localization.get()){
               this.setLocation(localization.get());
               computation.stop();
           }
        });
    }

    submit() {
        if (!this.uploader) {
            this.setError("A foto não foi configurada.");
        } else {
            if(!this.party.position){
                this.setError("A posição não foi ajustada.");
            } else {
                self = this;

                this.uploader.subscribe("add-party-form", this.$bindToContext((error, fileId) => {
                    if(error) {
                        self.setError('Houve um problema durante o upload da foto. Tente de novo.');
                    } else {

                        self.party.image = fileId;
                        self.party.owner = Meteor.userId();

                        Parties.insert(self.party);

                        if (self.done) {
                            self.done();
                        }

                        self.reset();
                    }
                }));

                this.uploader.start();
            }
        }
    }

    setLocation(position) {
        this.$bindToContext(() => {
            this.party.position = position;
        })();
    }

    setError(message) {
        this.$bindToContext(() => {
            this.error = message;
        })();
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
