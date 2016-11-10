import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

export function EnsuresLogout(done) {
    if (Meteor.userId()) {
        Meteor.logout(done);
    } else {
        done();
    }
}

export function EnsuresUserCreation(user, done) {
    if (!user.create) {
        Accounts.createUser({
            username: user.username,
            password: user.password
        }, function(error) {
            user.create = true;
            if (!Meteor.userId()) {
                Meteor.loginWithPassword(user.username, user.password, function(err) {
                    user._id = Meteor.userId();
                    done();
                });
            } else {
                user._id = Meteor.userId();
                done();
            }
        });
    } else {
        done();
    }
}

export function EnsuresLogin(user, done) {
    if (!Meteor.userId()) {
        Meteor.loginWithPassword(user.username, user.password, done);
    } else {
        done();
    }
}
