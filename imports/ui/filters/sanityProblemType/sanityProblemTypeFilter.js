import angular from 'angular';

import {
    GetSanityArea, GetSanitySubArea
} from '../../modules/sanityAreas/sanityAreas';

const name = 'sanityProblemTypeFilter';

/**
 * @return {string}
 */
function SanityProblemTypeFilter(type) {
    if (!type){
        return '';
    } else {
        return 'Falha: ' + GetSanitySubArea(type.area, type.subArea).name;
    }
}

// create a module
export default angular.module(name, [])
    .filter(name, () => {
        return SanityProblemTypeFilter;
    });
