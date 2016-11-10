import {
    name as Login
} from '../login';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';

import {
    LoadController
} from '../../../modules/load/load';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('Login', function() {
    spies.restoreAll();

    beforeEach(function(done) {
        window.module(Login);
        done();
    });

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            LoadController(Login, function(component) {
                controller = component;
            }, done);
        });

        it('should have credentials empty by default', function(done) {
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

        describe('login()', function() {
            let fakeuser = {
                email: 'jon.snow@winter.com',
                password: 'winteriscoming'
            };

            afterEach(function(done) {
                if (spies.login) {
                    spies.login.restore();
                }
                done();
            });

            it('should call Meteor.loginWithPassword', function(done) {
                spies.create('login', Meteor, 'loginWithPassword');

                controller.credentials = {
                    email: fakeuser.email,
                    password: fakeuser.password
                };
                controller.login();

                expect(spies.login).to.be.calledWith(fakeuser.email, fakeuser.password);
                done();
            });
        });

        describe('loginGoogle()', function() {
            it('should call Meteor.loginWithGoogle', function(done) {
                spies.create('login', Meteor, 'loginWithGoogle');

                controller.loginGoogle();

                expect(spies.login).to.be.called;
                done();
            });
        });

        describe('loginFacebook()', function() {
            it('should call Meteor.loginWithFacebook', function(done) {
                spies.create('login', Meteor, 'loginWithFacebook');

                controller.loginFacebook();

                expect(spies.login).to.be.called;
                done();
            });
        });
    });
});
