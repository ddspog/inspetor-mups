import {
    name as Register
} from '../register';

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

describe('Register', function() {
    spies.restoreAll();

    if (!process.env.TESTING) {
        process.env.TESTING = 1;
    }

    beforeEach(function(done) {
        window.module(Register);
        done();
    });

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            LoadController(Register, function(component) {
                controller = component;
            }, done);
        });

        it('should have credentials all empty by default', function(done) {
            expect(controller.credentials).to.be.deep.equal({
                email: '',
                password: ''
            });
            done();
        });

        it('should have error empty by default', function(done) {
            expect(controller.error).to.be.equal('');
            done();
        });

        describe('register()', function() {
            let validEmail = 'tyrion.lannister@meeren.com';
            let validPassword = 'IDONTCARE';

            afterEach(function(done) {
                if (spies.register) {
                    spies.register.restore();
                }
                done();
            });

            it('should call Meteor.loginWithPassword', function(done) {
                spies.create('register', Accounts, 'createUser');

                controller.credentials = {
                    email: validEmail,
                    password: validPassword
                };
                controller.register();

                expect(spies.register).to.be.calledWith(controller.credentials);
                done();
            });
        });

        describe('loginGoogle()', function() {
            it('should call Meteor.loginWithGoogle', function(done) {
                spies.create('register', Meteor, 'loginWithGoogle');

                controller.loginGoogle();

                expect(spies.register).to.be.called;
                done();
            });
        });

        describe('loginFacebook()', function() {
            it('should call Meteor.loginWithFacebook', function(done) {
                spies.create('register', Meteor, 'loginWithFacebook');

                controller.loginFacebook();

                expect(spies.register).to.be.called;
                done();
            });
        });
    });
});
