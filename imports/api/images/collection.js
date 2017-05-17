import { Mongo } from 'meteor/mongo';

export const Thumbs = new Mongo.Collection('thumbs');
export const Images = new Mongo.Collection('images');

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
/*
Images.after.insert(function (userId, doc) {
  let thumbDoc = {
    filename: doc.filename,
    originalCollection: 'images',
    originalId: this._id
  };

  const inputBuf = Buffer.from(doc.bin, 'base64');
  const gm = require('gm');

  gm(inputBuf)
      .resize('64')
      .autoOrient()
      .toBuffer('JPEG', function (error, buffer) {
          if(error){
            console.log('Transformation of image returned error.');
          } else {
            thumbDoc.bin = buffer.toString('base64');
            Thumbs.insert(thumbDoc, function (error, result) {
                if(error){
                    console.log('Error storing image on thumbs collection: ' + error);
                } else {
                     console.log('Thumbnail stored with id = ' + result);
                }
            });
          }
      })

});
*/