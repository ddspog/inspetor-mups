import {
    invite,
    rsvp
} from './methods';
import {
    Parties
} from './collection';

import {
    Meteor
} from 'meteor/meteor';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

if (Meteor.isServer) {
    describe('Parties / Methods', function() {
        beforeEach(function(done) {
            spies.restoreAll();
            stubs.restoreAll();
            done();
        });

        describe('invite', function() {
            // Initialize scope loggin userId.
            function loggedIn(userId = 'userId') {
                return {
                    userId
                };
            }

            it('should be called from Method', function(done) {
                spies.create('invite', invite, 'apply');

                try {
                    Meteor.call('invite');
                } catch (e) {}

                expect(spies.invite).to.have.been.called;

                spies.invite.restore();
                done();
            });

            it('should fail on missing partyId', function(done) {
                expect(function() {
                    invite.call({});
                }).to.throw(Error);
                done();
            });

            it('should fail on missing userId', function(done) {
                expect(function() {
                    invite.call({}, 'partyId');
                }).to.throw(Error);
                done();
            });

            it('should fail on not logged in', function(done) {
                expect(function() {
                    invite.call({}, 'partyId', 'userId');
                }).to.throw(/logged in/i);
                done();
            });

            it('should look for a party', function(done) {
                const partyId = 'partyId';
                spies.create('findOne', Parties, 'findOne');

                try {
                    invite.call(loggedIn(), partyId, 'userId');
                } catch (e) {}

                expect(spies.findOne).to.have.been.calledWith(partyId);

                spies.findOne.restore();
                done();
            });

            it('should fail if party does not exits', function(done) {
                stubs.create('findOne', Parties, 'findOne').returns(undefined);

                expect(function() {
                    invite.call(loggedIn(), 'partyId', 'userId');
                }).to.throw(/404/);

                stubs.findOne.restore();
                done();
            });

            it('should fail if logged in user is not the owner', function(done) {
                stubs.create('findOne', Parties, 'findOne').returns({
                    owner: 'notUserId'
                });

                expect(function() {
                    invite.call(loggedIn(), 'partyId', 'userId');
                }).to.throw(/404/);

                stubs.findOne.restore();
                done();
            });

            it('should fail on public party', function(done) {
                stubs.create('findOne', Parties, 'findOne').returns({
                    owner: 'userId',
                    public: true
                });

                expect(function() {
                    invite.call(loggedIn(), 'partyId', 'userId');
                }).to.throw(/400/);

                stubs.findOne.restore();
                done();
            });

            it('should NOT invite user who is the owner', function(done) {
                stubs.create('findOne', Parties, 'findOne').returns({
                    owner: 'userId'
                });
                spies.create('update', Parties, 'update');

                invite.call(loggedIn(), 'partyId', 'userId');

                expect(spies.update).to.not.have.been.called;

                stubs.findOne.restore();
                spies.update.restore();
                done();
            });

            it('should NOT invite user who has already invited', function(done) {
                stubs.create('findOne', Parties, 'findOne').returns({
                    owner: 'userId',
                    invited: ['invitedId']
                });
                spies.create('update', Parties, 'update');

                invite.call(loggedIn(), 'partyId', 'invitedId');

                expect(spies.update).to.not.have.been.called;

                stubs.findOne.restore();
                spies.update.restore();
                done();
            });

            it('should invite user who has not been invited and is not the owner', function(done) {
                const partyId = 'partyId';
                const userId = 'notInvitedId';
                stubs.create('findOne', Parties, 'findOne').returns({
                    owner: 'userId',
                    invited: ['invitedId']
                });
                spies.create('update', Parties, 'update');
                stubs.create('usersFindOne', Meteor.users, 'findOne').returns({});

                invite.call(loggedIn(), partyId, userId);

                expect(spies.update).to.have.been.calledWith(partyId, {
                    $addToSet: {
                        invited: userId
                    }
                });
                stubs.findOne.restore();
                spies.update.restore();
                stubs.usersFindOne.restore();
                done();
            });
        });

        describe('rsvp', function() {
            // Initialize scope loggin userId.
            function loggedIn(userId = 'userId') {
                return {
                    userId
                };
            }

            it('should be called from Method', function(done) {
                spies.create('apply', rsvp, 'apply');

                try {
                    Meteor.call('rsvp');
                } catch (e) {}

                expect(spies.apply).to.have.been.called;

                spies.apply.restore();
                done();
            });

            it('should fail on missing partyId', function(done) {
                expect(function() {
                    rsvp.call({});
                }).to.throw(Error);
                done();
            });

            it('should fail on missing rsvp', function(done) {
                expect(function() {
                    rsvp.call({}, 'partyId');
                }).to.throw(Error);
                done();
            });

            it('should fail if not logged in', function(done) {
                expect(function() {
                    rsvp.call({}, 'partyId', 'rsvp');
                }).to.throw(/403/);
                done();
            });

            it('should fail on wrong answer', function(done) {
                expect(function() {
                    rsvp.call(loggedIn(), 'partyId', 'wrong');
                }).to.throw(/400/);
                done();
            });

            ['yes', 'maybe', 'no'].forEach(function(answer) {
                it(`should pass on '${answer}'`, function(done) {
                    expect(function() {
                        rsvp.call(loggedIn(), 'partyId', answer);
                    }).not.to.throw(/400/);
                    done();
                });
            });

            // TODO: more tests
        });
    });
}
