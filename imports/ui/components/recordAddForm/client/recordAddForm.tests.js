import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import {
    name as RecordAddForm
} from '../recordAddForm';
import {
    Records
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

describe('RecordAddForm', function() {
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
        window.module(RecordAddForm);

        EnsuresUserCreation(fakeUser, done);
    });

    // Test inside controller
    describe('controller', function() {
        let controller;

        const record = {
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };
        const doneCallback = function() {};

        // Initialize controller
        beforeEach(function(done) {
            LoadController(RecordAddForm, function(component) {
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
            it('should clean up record object', function(done) {
                controller.record = record;
                controller.reset();

                expect(controller.record).to.be.deep.equal({});
                done();
            });
        });

        describe('submit()', function() {
            // Monitors insert, reset on submit calls
            beforeEach(function(done) {
                spies.create('insert', Records, 'insert');
                spies.create('reset', controller, 'reset');

                controller.record = record;

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

            it('should insert a new record', function(done) {
                expect(Meteor.userId()).to.not.equal(null);
                expect(spies.insert).to.have.been.calledWith({
                    name: record.name,
                    description: record.description,
                    public: record.public,
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
