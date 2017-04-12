//noinspection JSUnresolvedVariable
import SanityAreasDetails from './sanityAreasDetails.json';

export function GetSanityAreas() {
    return SanityAreasDetails;
}

export function GetSanityArea(areaValue) {
    if (areaValue) {
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
    if (areaValue && subAreaValue) {
        let area = GetSanityArea(areaValue);

        return area.subAreas[subAreaValue];
    }
}