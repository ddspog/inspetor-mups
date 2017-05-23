/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [description]
 * @param  {String}   name    [description]
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */
export function upload(dataUrl, name, collection, resolve, reject) {
  collection.insert({
      filename: name,
      bin: dataUrl
  }, function (error, result) {
      if(error){
          reject(error, result);
      } else {
          resolve(error, result);
      }
  });
}
