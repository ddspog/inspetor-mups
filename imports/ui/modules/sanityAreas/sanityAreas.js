//noinspection JSUnresolvedVariable
import SanityAreasDetails from './sanityAreasDetails.json';

export function GetSanityAreas() {
    return SanityAreasDetails;
}

export function GetSanityArea(areaValue) {
    if (areaValue || areaValue == 0) {
        return SanityAreasDetails[areaValue];
    }
}

export function GetSanitySubAreas(areaValue) {
    if (areaValue) {
        let area = GetSanityArea(areaValue);

        return area.subAreas;
    }
}

export function GetSanitySubArea(areaValue, subAreaValue) {
    if (areaValue || subAreaValue || areaValue == 0 || subAreaValue == 0) {
        let area = GetSanityArea(areaValue);

        return area.subAreas[subAreaValue];
    }
}