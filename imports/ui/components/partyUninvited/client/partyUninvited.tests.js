import {
    name as PartyUninvited
} from '../partyUninvited';

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

describe('PartyUninvited', function() {
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
        window.module(PartyUninvited);

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
        let userNotInvited = {
            username: 'cersei_lannister',
            password: 'BROLOVE',
            emails: [{
                address: 'cersei.lannister@kingslanding.com'
            }],
            _id: 'IChooseViolence'
        };

        beforeEach(function(done) {
            LoadController(PartyUninvited, function(component) {
                controller = component;
            }, done, {
                party
            });
        });

        describe('invite()', function() {
            beforeEach(function(done) {
                spies.create('callMethod', Meteor, 'call');
                stubs.create('findOne', Parties, 'findOne').returns(party);
                stubs.create('usersFindOne', Meteor.users, 'findOne')
                    .returns(userNotInvited);

                EnsuresLogin(fakeUser, done);
            });

            it('should call invite with user not invited', function(done) {
                controller.party.owner = fakeUser._id;
                controller.invite(userNotInvited);

                expect(spies.callMethod).to.be.calledWith('invite', party._id, userNotInvited._id);

                spies.callMethod.restore();
                stubs.findOne.restore();
                stubs.usersFindOne.restore();
                done();
            });
        });
    });
});
