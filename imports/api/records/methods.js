import _ from 'underscore';
import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';
import {
    Email
} from 'meteor/email';

import {
    Records
} from './collection';

function getContactEmail(user) {
    if (user) {
        if (user.emails && user.emails.length)
            return user.emails[0].address;

        if (user.services && user.services.facebook && user.services.facebook.email)
            return user.services.facebook.email;

        if (user.services && user.services.google && user.services.google.email)
            return user.services.facebook.email;
    }
    return null;
}

// Remember this refers to Meteor, eg: this.userId == Meteor.userId()
export function invite(recordId, userId) {
    check(recordId, String);
    check(userId, String);

    if (!this.userId) {
        throw new Meteor.Error(400, 'Você deve estar logado!');
    }

    const record = Records.findOne(recordId);

    if (!record || record.owner !== this.userId) {
        throw new Meteor.Error(404, 'Sem permissão!');
    }

    if (record.public) {
        throw new Meteor.Error(400, 'Este registro é público. Não há necessidade de convidar ninguém.');
    }

    if (userId !== record.owner && !_.contains(record.invited, userId)) {
        Records.update(recordId, {
            $addToSet: {
                invited: userId
            }
        });

        const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
        const to = getContactEmail(Meteor.users.findOne(userId));

        if (Meteor.isServer && to) {
            Email.send({
                to,
                replyTo,
                from: 'noreply@socially.com',
                subject: `PARTY: ${record.name}`,
                text: `
          Hey, I just invited you to ${record.name} on Socially.
          Come check it out: ${Meteor.absoluteUrl()}
                      `
            });
        }
    }
}

Meteor.methods({
    invite
});
