import { Mongo } from 'meteor/mongo';
import { Ground } from 'meteor/ground:db';

// Declares parties Collection
export const Parties = new Mongo.Collection('parties');

if(Meteor.isCordova){
  Ground.Collection(Parties);
}

Parties.allow({
  insert(userId, party){
    return userId && party.owner === userId;
  },
  update(userId, party, fields, modifier) {
    return userId && party.owner === userId;
  },
  remove(userId, party){
    return userId && party.owner === userId;
  }
});