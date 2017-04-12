import { UploadFS } from 'meteor/jalik:ufs';
import { ImagesStore } from './store';
import { dataURLToBlob, blobToArrayBuffer } from './helpers';

/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [description]
 * @param  {String}   name    [description]
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */
export function upload(dataUrl, name, store, resolve, reject) {
  console.log('Converting Data URL (' + dataUrl + ') to blob...')
  // convert to Blob
  const blob = dataURLToBlob(dataUrl);
  blob.name = name;

  console.log('Defining file from Blob (' + blob + ')');
  // pick from an object only: name, type and size
  const file = _.pick(blob, 'name', 'type', 'size');

  const upload = new UploadFS.Uploader({
    data: blob,
    file,
    store,
    adaptive: true,
    capacity: 0.8,
    onError: function (err, file) {
        console.log('Upload of ' + file.name + ' has encountered an error -> ' + err);
    },
    onAbort: function (file) {
        console.log(file.name + ' upload has been aborted...');
    },
    onStart: function (file) {
      console.log(file.name + ' started uploading...');
    },
    onStop: function (file) {
      console.log(file.name + ' upload has stopped...');
    },
    onProgress: function (file, progress) {
        console.log(file.name + ' ' + (progress*100) + '% uploaded...');
    },
    onCreate: function (file) {
        console.log(file.name + ' has been created with ID ' + file._id);
    },
    onComplete: resolve
  });

  upload.start();
}
