import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Records } from './collection';

if (Meteor.isServer) {
  Meteor.publish('records', function(options, searchString){
    const selector = {
      $or: [{
        // the public records
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is one of invited
        $and: [{
          invited: this.userId
        }, {
          invited: {
            $exists: true
          }
        }]
      }]
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }

    Counts.publish(this, 'numberOfRecords', Records.find(selector), {
      noReady: true
    });

    return Records.find(selector, options);
  });
}
