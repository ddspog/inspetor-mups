// Import packages
import angular from 'angular';

import {
    Meteor
} from 'meteor/meteor';

import {
    name as Socially
} from '../imports/ui/components/socially/socially';

function onReady() {
    angular.bootstrap(document, [
        Socially
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    if (Meteor.isClient){
        Meteor.subscribe('images');
        Meteor.subscribe('thumbs');
    }
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
