import {
    Meteor
} from 'meteor/meteor';

/*
  Requires the settings (currently in private/settings/development.json)
  to be written on the following structure:
    {
        [...],
        "mailUrl": {
            "email": "",
            "password": ""
        }, [...]
    }
*/
function configureEmail(config) {
    // just set the environment variable
    process.env.MAIL_URL = "smtp://" + config.email + ":" + config.password + "@smtp.gmail.com:465/";
}

Meteor.startup(function() {
    const emailConfig = Meteor.settings.mailUrl;
    if (emailConfig) {
        configureEmail(emailConfig);
    }
});
