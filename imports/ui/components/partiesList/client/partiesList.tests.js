import {
    name as PartiesList
} from '../partiesList';

import 'angular-mocks';

import {
    ConfigGoogleMap
} from '../../../configs/googleMap/googleMapConfig';

import {
    LoadController
} from '../../../modules/load/load';

import {
    chai
} from 'meteor/practicalmeteor:chai';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

should();

describe('PartiesList', function() {
    if (!process.env.TESTING) {
        process.env.TESTING = 1;
    }

    beforeEach(function(done) {
        if (!stubs.config) {
            stubs.create('config', ConfigGoogleMap, 'apply').returns('');
        }

        window.module(PartiesList);

        done();
    });

    afterEach(function(done) {
        stubs.config.restore();
        done();
    });

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            LoadController(PartiesList, function(component) {
                controller = component;
            }, done);
        });

        it('should have perPage equals 3 by default', function(done) {
            expect(controller.perPage).to.be.equal(3);
            done();
        });

        it('should have page equals 1 by default', function(done) {
            expect(controller.page).to.be.equal(1);
            done();
        });

        it('should sort by name - ASC by default', function(done) {
            expect(controller.sort).to.be.deep.equal({
                name: 1
            });
            done();
        });

        it('should be able to change sorting', function(done) {
            controller.sortChanged({
                name: -1
            });

            expect(controller.sort).to.be.deep.equal({
                name: -1
            });

            done();
        });

        it('should be able to change page', function(done) {
            controller.pageChanged(2);

            expect(controller.page).to.be.equal(2);
            done();
        });
    });
});
