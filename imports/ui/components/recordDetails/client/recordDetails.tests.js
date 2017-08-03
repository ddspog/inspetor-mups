import {
    name as RecordDetails
} from '../recordDetails';
import {
    Records
} from '../../../../api/records';

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

describe('RecordDetails', function() {
    beforeEach(function(done) {
        window.module(RecordDetails);
        spies.restoreAll();
        done();
    });

    describe('controller', function() {
        let controller;
        const record = {
            _id: 'recordId',
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };

        beforeEach(function(done) {
            LoadController(RecordDetails, function(component) {
                controller = component;
            }, done);
        });

        describe('save()', function() {
            beforeEach(function(done) {
                if (spies.update)
                    spies.update.restore();
                spies.create('update', Records, 'update');

                controller.record = record;
                controller.save();
                done();
            });

            it('should update a proper record', function(done) {
                expect(spies.update.lastCall.args[0]).to.be.deep.equal({
                    _id: record._id
                });
                done();
            });

            it('should update with proper modifier', function(done) {
                expect(spies.update.lastCall.args[1]).to.be.deep.equal({
                    $set: {
                        name: record.name,
                        description: record.description,
                        public: record.public,
                        location: record.location
                    }
                });
                done();
            });
        });
    });
});
