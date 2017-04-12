import angular from 'angular';
//noinspection JSUnresolvedVariable
import MDIToUnicode from './mdiIconsTable.json';

const name = 'mdiIconFilter';

function MDIIconFilter(name) {

    if (!name) {
        return '';
    }

    return MDIToUnicode[name];
}

// create a module
export default angular.module(name, [])
    .filter(name, () => {
        return MDIIconFilter;
    });
