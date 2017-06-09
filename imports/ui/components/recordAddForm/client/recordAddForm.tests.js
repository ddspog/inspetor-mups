import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import {
    name as PartyAddForm
} from '../partyAddForm';
import {
    Parties
} from '../../../../api/records';

import {
    LoadController
} from '../../../modules/load/load';
import {
    EnsuresUserCreation,
    EnsuresLogin
} from '../../../modules/ensure/ensure';

import 'angular-mocks';

import {
    chai
} from 'meteor/practicalmeteor:chai';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

should();

describe('PartyAddForm', function() {
    let fakeUser = {
        username: 'tyrion_lanister',
        password: 'IDONTCARE',
        create: false,
        _id: ''
    };

    spies.restoreAll();
    stubs.restoreAll();
    // Initialize module
    beforeEach(function(done) {
        window.module(PartyAddForm);

        EnsuresUserCreation(fakeUser, done);
    });

    // Test inside controller
    describe('controller', function() {
        let controller;

        const party = {
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };
        const doneCallback = function() {};

        // Initialize controller
        beforeEach(function(done) {
            LoadController(PartyAddForm, function(component) {
                controller = component;
            }, done, {
                done: doneCallback
            });
        });

        it('should set done', function(done) {
            expect(controller.done).to.be.an(typeof doneCallback);
            done();
        });

        describe('reset()', function() {
            it('should clean up party object', function(done) {
                controller.party = party;
                controller.reset();

                expect(controller.party).to.be.deep.equal({});
                done();
            });
        });

        describe('submit()', function() {
            // Monitors insert, reset on submit calls
            beforeEach(function(done) {
                spies.create('insert', Parties, 'insert');
                spies.create('reset', controller, 'reset');

                controller.party = party;

                EnsuresLogin(fakeUser, function(err) {
                    controller.submit();
                    done();
                });
            });

            afterEach(function(done) {
                if (spies.insert) {
                    spies.insert.restore();
                }
                if (spies.reset) {
                    spies.reset.restore();
                }
                done();
            });

            it('should insert a new party', function(done) {
                expect(Meteor.userId()).to.not.equal(null);
                expect(spies.insert).to.have.been.calledWith({
                    name: party.name,
                    description: party.description,
                    public: party.public,
                    owner: Meteor.userId()
                });
                done();
            });

            it('should call reset()', function(done) {
                expect(spies.reset).to.have.been.called;
                done();
            });
        });
    });
});
