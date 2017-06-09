import {
    name as PartiesSort
} from '../partiesSort';

import 'angular-mocks';

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

describe('PartiesSort', function() {
    spies.restoreAll();

    beforeEach(function(done) {
        window.module(PartiesSort);
        done();
    });

    describe('controller', function() {
        let controller;
        const onChange = function() {};
        const property = 'name';
        const order = -1;

        beforeEach(function(done) {
            LoadController(PartiesSort, function(component) {
                controller = component;
            }, done, {
                onChange,
                property,
                order
            });
        });

        it('should set property', function(done) {
            expect(controller.property).to.be.equal(property);
            done();
        });

        it('should set an order', function(done) {
            expect(controller.order).to.be.equal(order);
            done();
        });

        it('should set onChange', function(done) {
            expect(controller.onChange).to.be.an(typeof onChange);
            done();
        });

        describe('changed()', function() {
            afterEach(function(done) {
                if (spies.onChange)
                    spies.onChange.restore();
                done();
            });

            it('should call onChange', function(done) {
                spies.create('onChange', controller, 'onChange');

                controller.changed();

                expect(spies.onChange).to.have.been.calledWith({
                    sort: {
                        [property]: order
                    }
                });
                done();
            });
        });
    });
});
