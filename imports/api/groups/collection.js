import { Mongo } from 'meteor/mongo';
import { Ground } from 'meteor/ground:db';

// Declares records Collection
export const Groups = new Mongo.Collection('groups');

if(Meteor.isCordova){
  Ground.Collection(Groups);
}