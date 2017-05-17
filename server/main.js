import {
    Meteor
} from 'meteor/meteor';

import '../imports/startup/fixtures';
import '../imports/api/index';

console.log("(^-^)/ The server is up and running...");

if(Meteor.isCordova){
    console.log(cordova.file);
}