import {UploadFS} from 'meteor/mdg:camera';

import {Images, Thumbs} from '../../../api/images';

import {RotateCounterClockwise} from '../../modules/rotate/rotate';

import {UploadControl} from '../../classes/uploadControl/uploadControl';

export class PartyUpload {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        // set picture size for camera
        this.cameraOptions = {
            width: 800,
            height: 600
        };

        this.image = undefined;
        this.control = undefined;
    }

    // create object to start upload of files
    configureUpload(data) {
        this.$bindToContext(() => {
            this.image = data;
        })();

        this.control = new UploadControl({
            source: data,
            collection: Images,
            header: 'Record Image at '
        });

        self = this;

        this.control.configureCallback(this.$bindToContext((error, fileId) => {
            self.file = fileId;
        }));

        this.control.configureError((error, fileId) => {
            console.log('The upload has encountered an error -> ' + error, error);
        });
    }

    // take a picture using android camera
    takePicture() {
        self = this;

        MeteorCamera.getPicture(this.cameraOptions, this.$bindToContext((err, data) => {
            if (err) {
                console.log('Oops, something wrong! => ' + err, err);
            } else {
                RotateCounterClockwise(data, function(rotatedPicture) {
                    self.configureUpload(rotatedPicture);
                });
            }
        }));
    }

    reset() {
        this.image = undefined;
        this.control = undefined;
    }
}
