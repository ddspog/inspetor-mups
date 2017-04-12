import {Thumbs, upload} from '../../../api/images';

export class PartyUpload {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.uploaded = [];

        this.subscribe('thumbs', () => [
            this.getReactively('files', true) || []
        ]);

        this.helpers({
            thumbs() {
                return Thumbs.find({
                    originalStore: 'images',
                    originalId: {
                        $in: this.getReactively('files', true) || []
                    }
                });
            }
        });
    }

    addImages(files) {
        if (files.length) {
            this.currentFile = files[0];
            const reader = new FileReader;

            reader.onload = this.$bindToContext((e) => {
                this.imgSrc = e.target.result;
            });

            reader.readAsDataURL(files[0]);
        } else {
            this.imgSrc = undefined;
        }
    }

    save() {
        upload(this.imgSrc, this.currentFile.name, this.$bindToContext((file) => {
            this.uploaded.push(file);

            if (!this.files || !this.files.length) {
                this.files = [];
            }
            this.files.push(file._id);

            this.reset();
        }), (e) => {
            console.log('Oops, something went wrong -> ' + e, e);
        });
    }

    reset() {
        this.imgSrc = undefined;
    }
}