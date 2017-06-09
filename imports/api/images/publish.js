import { Meteor } from 'meteor/meteor';
import { Images } from './collection';

if (Meteor.isServer) {
    Meteor.publish('images', function() {
        return Images.find({});
    });
}
