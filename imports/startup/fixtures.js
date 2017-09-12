import {
    Meteor
} from 'meteor/meteor';

// Initialize server
Meteor.startup(() => {
    // Loads initial values for DB
    BrowserPolicy.content.allowSameOriginForAll();
    BrowserPolicy.content.allowOriginForAll('*://localhost:12768/*');
    BrowserPolicy.content.allowOriginForAll('*://inspetor-mups.herokuapp.com/*');
    BrowserPolicy.content.allowOriginForAll('*://ajax.googleapis.com/*');
    BrowserPolicy.content.allowOriginForAll('*://fonts.googleapis.com/*');
    BrowserPolicy.content.allowOriginForAll('*://fonts.*.com/*');
    BrowserPolicy.content.allowEval();
    BrowserPolicy.framing.disallow();

    // Listen to incoming HTTP requests, can only be used on the server
    WebApp.connectHandlers.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
    });
});
