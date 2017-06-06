import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Ground } from 'meteor/ground:db';

export const Images = new Mongo.Collection('images');

if(Meteor.isCordova) {
  Ground.Collection(Images);
  Ground.methodResume([
    '/' + self.name + '/insert',
    '/' + self.name + '/remove',
  ], self.connection);
}

function loggedIn(userId) {
  return !!userId;
}

Images.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});