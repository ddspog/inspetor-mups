import {
    Meteor
} from 'meteor/meteor';

export function getGoogleAPIBrowserConfiguration() {
    if (Meteor.isServer) {
        try {
            return Meteor.settings.api.google.browser;
        } catch (e) {
            throw new Meteor.Error(500, "Missing update on settings.");
        }
    } else {
        throw new Meteor.Error(404, "Wasn't loading on server.");
    }
}

Meteor.methods({
    getGoogleAPIBrowserConfiguration
});
