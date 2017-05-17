import _ from 'underscore';

export function CreateThumbnail(file, _callback) {
    let name, filepath, size, type, extension, version = 'thumb', info;

    let mime = Npm.require('mime');
    let path = Npm.require('path');
    let fs = Npm.require('fs');
    let stats = fs.statSync(file);

    // prepare thumbnail info
    size = stats["size"];
    type = mime.lookup(file);
    extension = path.extname(file);

    name = path.basename(file, extension);
    filepath = path.dirname(file) + '/' + name + extension;

    info = {
        name: name,
        path: filepath,
        size: size,
        type: type,
        extension: extension.replace('.', ''),  //remove dot for return object
        version: version,
        success: false
    };

    let gm = Npm.require('gm');

    // create a file copy
    let thumbFile = _.clone(file);
    gm(thumbFile)
        .resize(Meteor.settings.public.app_settings.thumbnail_width)    // width
        .autoOrient()
        .write(filepath, function (err) {
            if (err) {
                console.log('GM resizing has encountered error:\n', err);
                info.success = false;
            } else {
                info.success = true;
            }
            _callback(info);
        })
    ;
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