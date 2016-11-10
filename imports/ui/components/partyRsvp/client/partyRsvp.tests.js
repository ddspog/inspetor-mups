import {
    name as PartyRsvp
} from '../partyRsvp';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';
import {
    Parties
} from '../../../../api/parties/collection';

import {
    LoadController
} from '../../../modules/load/load';
import {
    EnsuresUserCreation,
    EnsuresLogin
} from '../../../modules/ensure/ensure';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('PartyRsvp', function() {
    let fakeUser = {
        username: 'tyrion_lanister',
        password: 'IDONTCARE',
        create: false,
        _id: ''
    };

    if (!process.env.TESTING)
        process.env.TESTING = 1;

    spies.restoreAll();
    stubs.restoreAll();

    beforeEach(function(done) {
        window.module(PartyRsvp);

        EnsuresUserCreation(fakeUser, done);
    });

    describe('controller', function() {
        let controller;
        let party = {
            _id: '010100111010',
            name: 'Testing Party',
            description: 'Bring your friends and computers!',
            owner: fakeUser._id
        };

        beforeEach(function(done) {
            LoadController(PartyRsvp, function(component) {
                controller = component;
            }, done, {
                party
            });
        });

        describe('answer()', function() {
            beforeEach(function(done) {
                spies.create('callMethod', Meteor, 'call');
                stubs.create('findOne', Parties, 'findOne').returns(party);

                EnsuresLogin(fakeUser, done);
            });

            ['yes', 'maybe', 'no'].forEach(function(answer) {
                it(`should call rsvp with '${answer}'`, function(done) {
                    controller.party.owner = fakeUser._id;
                    controller.answer(answer);

                    expect(spies.callMethod).to.be.calledWith('rsvp', party._id, answer);

                    spies.callMethod.restore();
                    stubs.findOne.restore();
                    done();
                });
            });
        });
    });
});
