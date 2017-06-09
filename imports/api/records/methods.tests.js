import {
    invite
} from './methods';
import {
    Records
} from './collection';

import {
    Meteor
} from 'meteor/meteor';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

if (Meteor.isServer) {
    describe('Records / Methods', function() {
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

            it('should fail on missing recordId', function(done) {
                expect(function() {
                    invite.call({});
                }).to.throw(Error);
                done();
            });

            it('should fail on missing userId', function(done) {
                expect(function() {
                    invite.call({}, 'recordId');
                }).to.throw(Error);
                done();
            });

            it('should fail on not logged in', function(done) {
                expect(function() {
                    invite.call({}, 'recordId', 'userId');
                }).to.throw(/logged in/i);
                done();
            });

            it('should look for a record', function(done) {
                const recordId = 'recordId';
                spies.create('findOne', Records, 'findOne');

                try {
                    invite.call(loggedIn(), recordId, 'userId');
                } catch (e) {}

                expect(spies.findOne).to.have.been.calledWith(recordId);

                spies.findOne.restore();
                done();
            });

            it('should fail if record does not exits', function(done) {
                stubs.create('findOne', Records, 'findOne').returns(undefined);

                expect(function() {
                    invite.call(loggedIn(), 'recordId', 'userId');
                }).to.throw(/404/);

                stubs.findOne.restore();
                done();
            });

            it('should fail if logged in user is not the owner', function(done) {
                stubs.create('findOne', Records, 'findOne').returns({
                    owner: 'notUserId'
                });

                expect(function() {
                    invite.call(loggedIn(), 'recordId', 'userId');
                }).to.throw(/404/);

                stubs.findOne.restore();
                done();
            });

            it('should fail on public record', function(done) {
                stubs.create('findOne', Records, 'findOne').returns({
                    owner: 'userId',
                    public: true
                });

                expect(function() {
                    invite.call(loggedIn(), 'recordId', 'userId');
                }).to.throw(/400/);

                stubs.findOne.restore();
                done();
            });

            it('should NOT invite user who is the owner', function(done) {
                stubs.create('findOne', Records, 'findOne').returns({
                    owner: 'userId'
                });
                spies.create('update', Records, 'update');

                invite.call(loggedIn(), 'recordId', 'userId');

                expect(spies.update).to.not.have.been.called;

                stubs.findOne.restore();
                spies.update.restore();
                done();
            });

            it('should NOT invite user who has already invited', function(done) {
                stubs.create('findOne', Records, 'findOne').returns({
                    owner: 'userId',
                    invited: ['invitedId']
                });
                spies.create('update', Records, 'update');

                invite.call(loggedIn(), 'recordId', 'invitedId');

                expect(spies.update).to.not.have.been.called;

                stubs.findOne.restore();
                spies.update.restore();
                done();
            });

            it('should invite user who has not been invited and is not the owner', function(done) {
                const recordId = 'recordId';
                const userId = 'notInvitedId';
                stubs.create('findOne', Records, 'findOne').returns({
                    owner: 'userId',
                    invited: ['invitedId']
                });
                spies.create('update', Records, 'update');
                stubs.create('usersFindOne', Meteor.users, 'findOne').returns({});

                invite.call(loggedIn(), recordId, userId);

                expect(spies.update).to.have.been.calledWith(recordId, {
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
    });
}
