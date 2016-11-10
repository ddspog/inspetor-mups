import {
    name as Auth
} from '../auth';

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
    EnsuresLogout,
    EnsuresUserCreation,
    EnsuresLogin
} from '../../../modules/ensure/ensure';

import {
    chai
} from 'meteor/practicalmeteor:chai';

should();

describe('Auth', function() {
    let fakeUser = {
        username: 'tyrion_lanister',
        password: 'IDONTCARE',
        create: false,
        _id: ''
    };

    if (!process.env.TESTING)
        process.env.TESTING = 1;

    beforeEach(function(done) {
        window.module(Auth);

        EnsuresUserCreation(fakeUser, done);
    });

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            LoadController(Auth, function(component) {
                controller = component;
            }, done);
        });

        describe('logout()', function() {
            beforeEach(function(done) {
                EnsuresLogout(done);
            });

            it('should logout when user it\'s logged', function(done) {
                EnsuresLogin(fakeUser, function(err) {
                    controller.logout(function(err) {
                        expect(Meteor.userId()).to.be.null;
                        done();
                    });
                });
            });

            it('should do nothing when user isn\'t logged', function(done) {
                controller.logout(function(err) {
                    expect(Meteor.userId()).to.be.null;
                    done();
                });
            });
        });
    });
});
