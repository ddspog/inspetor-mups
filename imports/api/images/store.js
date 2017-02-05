import { UploadFS } from 'meteor/jalik:ufs';
import { Images, Thumbs } from './collection';

export const ThumbsStore = new UploadFS.store.GridFS({
  collection: Thumbs,
  name: 'thumbs',
  permissions: new UploadFS.StorePermissions({
      insert: function (userId, doc) {
          return userId;
      },
      update: function (userId, doc) {
          userId === doc.userId;
      },
      remove: function (userId, doc) {
          return userId === doc.userId;
      }
  }),
  transformWrite(from, to, fileId, file) {
    // Resize to 32x32
    const gm = require('gm');

    gm(from, file.name)
      .resize(32, 32)
      .gravity('Center')
      .extent(32, 32)
      .quality(75)
      .stream()
      .pipe(to);
  }
});

export const ImagesStore = new UploadFS.store.GridFS({
  collection: Images,
  name: 'images',
  permissions: new UploadFS.StorePermissions({
      insert: function (userId, doc) {
          return userId;
      },
      update: function (userId, doc) {
          userId === doc.userId;
      },
      remove: function (userId, doc) {
          return userId === doc.userId;
      }
  }),
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  copyTo: [
    ThumbsStore
  ]
});
