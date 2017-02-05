import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1
      }
    });
  });

  Accounts._options.verificationMaxRetries = 20;
  Accounts._options.verificationRetriesWaitTime = 5 * 1000;
  Accounts._options.verificationWaitTime = 20 * 1000;

  Accounts.onCreateUser(function(options, user) {
      if (options.phone) {
          user.phone = {
              number : options.phone
          };
          if (options.profile && options.profile.name) {
              user.username = options.profile.name;
          } else {
              throw new Error("Profile Name needs to be filled on Client before calling function.");
          }
      }
      if (options.profile) {
          user.profile = options.profile
      }

      return user;
  });
}
