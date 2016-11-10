import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';
import {
    Parties
} from '../api/parties/index';

// Initialize server
Meteor.startup(() => {
    // Loads initial values for DB
    if (Parties.find().count() === 0) {
        let david = Accounts.createUser({
            'username': 'david_davos',
            'email': 'david.davos@cersei.net',
            'password': 'dontknowmypassword',
            'profile': {
                'name': 'David Davos'
            }
        });
        let julian = Accounts.createUser({
            'username': 'julian_hector',
            'email': 'julian.hector@val.com',
            'password': 'hahaha',
            'profile': {
                'name': 'Julian Hector'
            }
        });
        const parties = [{
            'name': 'Dubstep-Free Zone',
            'description': 'Get rid of this boring and hedious sound! Relax and enjoy to real good music, here at our beachs.',
            'public': true,
            'location': {
                latitude: 42,
                longitude: -70
            },
            'owner': david,
            'rsvps': [{
                'rsvp': 'no',
                'user': julian
            }, {
                'rsvp': 'yes',
                'user': david
            }]
        }, {
            'name': 'Pa-Paradise!',
            'description': 'Dubstep until dawn. Call your top jump-friend, so you won\'t stop alone on this party.',
            'public': true,
            'location': {
                latitude: 41,
                longitude: -74
            },
            'owner': julian,
            'rsvps': [{
                'rsvp': 'no',
                'user': david
            }, {
                'rsvp': 'maybe',
                'user': julian
            }]
        }, {
            'name': 'Savage lounging',
            'description': 'Leisure suit required. And only fiercest manners.',
            'public': true,
            'location': {
                latitude: 45,
                longitude: -73
            },
            'owner': david,
            'rsvps': [{
                'rsvp': 'maybe',
                'user': julian
            }, {
                'rsvp': 'yes',
                'user': david
            }]
        }];

        parties.forEach((party) => {
            Parties.insert(party)
        });
    }
});
