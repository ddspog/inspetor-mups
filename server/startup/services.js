import {
    Meteor
} from 'meteor/meteor';

/*
  Requires the settings (currently in private/settings/development.json)
  to be written on the following structure:
    {
        [...],
        "oAuth": {
            "facebook": {
                "clientId": "", "loginStyle": "", "secret": ""
            },
            "google": {
                "clientId": "", "loginStyle": "", "secret": ""
            }
        }, [...]
    }
*/
Meteor.startup(function() {
    const authServices = Meteor.settings.oAuth;

    // set all auth services the same way
    if (authServices) {
        for (let service in authServices) {
            ServiceConfiguration.configurations.upsert({
                service: service
            }, {
                $set: authServices[service]
            });
        }
    }
});
