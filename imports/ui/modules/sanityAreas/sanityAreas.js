import angular from 'angular';
import SanityAreasDetails from './sanityAreasDetails.json';

const name = 'displaySanityAreaFilter';

function GetSanityAreas() {
    return SanityAreasDetails;
}

function GetSanityArea(areaValue) {

    if (!areaValue) {
        return '';
    }

    return SanityAreasDetails[areaValue];
}

function GetSanitySubAreas(areaValue) {
    if (!areaValue) {
        return '';
    }

    var area = GetSanityArea(areaValue);

    return area.subAreas;
}

function GetSanitySubArea(areaValue, subAreaValue) {

    if (!areaValue || !subAreaValue) {
        return '';
    }

    var area = GetSanityArea(areaValue);

    return area.subAreas[subAreaValue];
}

// create a module
export angular.module('displaySanityAreaFilter', [])
    .filter('displaySanityAreaFilter', () => {
        return DisplaySanityAreaFilter;
    });
