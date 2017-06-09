import { Mongo } from 'meteor/mongo';
import { Ground } from 'meteor/ground:db';

// Declares records Collection
export const Records = new Mongo.Collection('records');

if(Meteor.isCordova){
  Ground.Collection(Records);
}

Records.allow({
  insert(userId, record){
    return userId && record.owner === userId;
  },
  update(userId, record, fields, modifier) {
    return userId && record.owner === userId;
  },
  remove(userId, record){
    return userId && record.owner === userId;
  }
});