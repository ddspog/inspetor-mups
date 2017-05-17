import {
    upload
} from '../../../api/images/methods';

export class UploadControl {
    constructor(config) {
        'ngInject';

        this.source = config.source;
        this.collection = config.collection;
        this.header = config.header;

        this.listeners = [];
    }

    subscribe(name, fn) {
        this.listeners.push({
            name,
            fn
        });
    }

    unsubscribe(name) {
        this.listeners = this.listeners.filter(
            function (item) {
                if (item.name !== name) {
                    return item;
                }
            }
        );
    }

    notify(e, o, thisObj) {
        var scope = thisObj || window;
        var self = this;

        this.listeners.forEach(function (item) {
            item.fn.call(scope, e, o);
            self.unsubscribe(item.name);
        });
    }

    configureCallback(fn) {
        var self = this;

        this.callback = function (error, fileId) {
            fn(error, fileId);
            self.notify(error, fileId);
        };
    }

    configureError(fn) {
        var self = this;

        this.error = function (error, fileId) {
            fn(error, fileId);
            self.notify(error, fileId);
        };
    }

    //start upload of files
    start() {
        console.log('Requesting upload...');

        upload(this.source, this.header + new Date(), this.collection, this.callback, this.error);
    }
}