import {
    name as Password
} from '../password';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import {
    LoadController
} from '../../../modules/load/load';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('Password', function() {
    if (!process.env.TESTING) {
        process.env.TESTING = 1;
    }

    spies.restoreAll();

    beforeEach(function(done) {
        window.module(Password);
        done();
    });

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            LoadController(Password, function(component) {
                controller = component;
            }, done);
        });

        it('should have credentials all empty by default', function(done) {
            expect(controller.credentials).to.be.deep.equal({
                email: ''
            });
            done();
        });

        it('should have error empty by default', function(done) {
            expect(controller.error).to.be.equal('');
            done();
        });

        describe('reset()', function() {
            let validEmail = 'tyrion.lannister@meeren.com';

            afterEach(function(done) {
                if (spies.forgot) {
                    spies.forgot.restore();
                }
                done();
            });

            it('should call Accounts.forgotPassword', function(done) {
                spies.create('forgot', Accounts, 'forgotPassword');

                controller.credentials = {
                    email: validEmail
                };
                controller.reset();

                expect(spies.forgot).to.be.calledWith(controller.credentials);
                done();
            });
        });
    });
});
