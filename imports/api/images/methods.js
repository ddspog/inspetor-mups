/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [description]
 * @param  {String}   name    [description]
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */
export function upload(dataUrl, partyId, name, collection, resolve, reject) {
  collection.insert({
      filename: name,
      bin: dataUrl,
      party: partyId
  }, function (error, result) {
      if(error){
          reject(error, result);
      } else {
          resolve(error, result);
      }
  });
}
