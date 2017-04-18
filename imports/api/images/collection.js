import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { Mongo } from 'meteor/mongo';

let gfs;
if (Meteor.isServer) {
    gfs = Grid(
        Mongo.defaultRemoteCollectionDriver().mongo.db,
        Mongo.NpmModule
    )
}

export const Images = new FilesCollection({
    collectionName: 'images',
    allowClientCode: false,
    debug: Meteor.isServer && process.env.NODE_ENV === 'development',
    onBeforeUpload: function (file) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    },
    onAfterUpload: function (image) {
        // Move file to GridFS
        Object.keys(image.versions)
              .forEach(versionName => {
                const metadata = {
                    versionName,
                    imageId: image._id,
                    storedAt: new Date()
                };
                const writeStream = gfs.createWriteStream({
                    filename: image.name,
                    metadata
                });

                gfs.createReadStream(image.versions[versionName].path)
                   .pipe(writeStream);

                writeStream.on('close', Meteor.bindEnvironment(file => {
                    const property = `versions.${versionName}.meta.gridFsFileId`;

                    // If we store the ObjectID itself, Meteor seems to convert it to a
                    // LocalCollection.ObjectID, which GFS doesn't undestand.
                    this.collection.update(
                        image._id, {
                            $set: {
                                [property]: file._id.toString()
                            }
                        }
                    );
                    this.unlink(
                        this.collection.findOne(image._id),
                        versionName
                    ); // Unlink files from FS
                }));
              });
    },
    interceptDownload: function (http, image, versionName) {
        // Serve files from GrifFS
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) {
            const readStream = gfs.createReadStream({
                _id
            });
            readStream.on('error', err => {
                throw err;
            });
            readStream.pipe(http.response);
        }
        return Boolean(_id); // Serve file from GridFS
    },
    onAfterRemove: function (images) {
        // Remove corresponding file from GridFS
        images.forEach(image => {
            Object.keys(image.versions)
                  .forEach(versionName => {
                      const _id = (image.versions[versionName].meta || {}).gridFsFileId;
                      if (_id) {
                          gfs.remove(
                              { _id },
                              err => {
                                  if (err) {
                                      throw  err;
                                  }
                              }
                          );
                      }
                  });
        });
    }
});
export const Thumbs = new Mongo.Collection('thumbs');

if (Meteor.isServer) {
    Images.denyClient();
}

function loggedIn(userId) {
  return !!userId;
}

Thumbs.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});

Images.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
