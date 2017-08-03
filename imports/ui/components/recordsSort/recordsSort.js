import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './recordsSort.html';

class RecordsSort {
    constructor() {
        this.changed();

        this.orderOptions = [
            {value:  1, text: "A-Z Order"},
            {value: -1, text: "Z-A Order"}
        ];
    }

    changed() {
        this.onChange({
            sort: {
              [this.property]: parseInt(this.order)
            }
        });
    }
}

const name = 'recordsSort';

// Create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        onChange: '&',
        property: '@',
        order: '@'
    },
    controllerAs: name,
    controller: RecordsSort
});
