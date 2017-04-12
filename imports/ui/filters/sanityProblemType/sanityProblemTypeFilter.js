import angular from 'angular';

import {
    GetSanityArea, GetSanitySubArea
} from '../../modules/sanityAreas/sanityAreas';

const name = 'sanityProblemTypeFilter';

/**
 * @return {string}
 */
function SanityProblemTypeFilter(type) {
    if (!type || !type.area || !type.subArea){
        return '';
    } else {
        return GetSanityArea(type.area).name + ' - ' + GetSanitySubArea(type.area, type.subArea).name;
    }
}

// create a module
export default angular.module(name, [])
    .filter(name, () => {
        return SanityProblemTypeFilter;
    });
