import { Meteor } from 'meteor/meteor';
import { Thumbs, Images } from './collection';

if (Meteor.isServer) {
    Meteor.publish('images', function() {
        return Images.find({});
    });

    Meteor.publish('thumbs', function() {
        return Thumbs.find({
          originalCollection: 'images'
        });
    });
}
