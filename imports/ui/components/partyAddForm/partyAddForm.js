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
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

class PartyAddForm {
    constructor() {
        this.party = {};

        this.areas = [
            {
                name: "Abastecimento de águas.",
                value: "0",
                icon: "water-pump"
            },
            {
                name: "Tratamento de esgoto.",
                value: "1",
                icon: "emoticon-poop"
            },
            {
                name: "Escoamento da chuva.",
                value: "2",
                icon: "weather-pouring"
            },
            {
                name: "Coleta de lixo.",
                value: "3",
                icon: "delete"
            }
        ]
    }

    submit() {
        this.party.owner = Meteor.userId();

        Parties.insert(this.party);

        if (this.done) {
            this.done();
        }

        this.reset();
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
