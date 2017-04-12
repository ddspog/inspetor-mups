import {upload} from '../../../api/images';

export class UploadControl {
    constructor(source, store, header) {
        'ngInject';

        this.source = source;
        this.store = store;
        this.header = header;
    }

    configureCallback(fn) {
        this.callback = fn;
    }

    configureError(fn) {
        this.error = fn;
    }

    //start upload of files
    start() {
        console.log('Starting upload...');
        upload(this.source, this.header + (new Date().toString('YYYY-MM-DDTHH:MM:SSZ')), this.store,
            this.callback, this.error);
    }
}