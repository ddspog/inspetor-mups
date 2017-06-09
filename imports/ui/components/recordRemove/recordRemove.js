import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './recordRemove.html';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import {
    Records
} from '../../../api/records/index';

class RecordRemove {
    remove() {
        if (this.record) {
            Records.remove(this.record._id);
        }
    }
}

const name = 'recordRemove';

// Create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        record: '<'
    },
    controllerAs: name,
    controller: RecordRemove
})
