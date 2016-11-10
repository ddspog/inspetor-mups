import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyRemove.html';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import {
    Parties
} from '../../../api/parties/index';

class PartyRemove {
    remove() {
        if (this.party) {
            Parties.remove(this.party._id);
        }
    }
}

const name = 'partyRemove';

// Create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        party: '<'
    },
    controllerAs: name,
    controller: PartyRemove
})
