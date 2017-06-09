import {
    name as RecordRemove
} from '../recordRemove';
import {
    Records
} from '../../../../api/records';

import 'angular-mocks';

import {
    LoadController
} from '../../../modules/load/load';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('RecordRemove', function() {
    // Initialize module
    beforeEach(function(done) {
        window.module(RecordRemove);
        spies.restoreAll();
        done();
    });

    // Test inside controller
    describe('controller', function() {
        let controller;
        const record = {
            _id: 'recordId'
        };

        // Initialize controller
        beforeEach(function(done) {
            LoadController(RecordRemove, function(component) {
                controller = component;
            }, done, {
                record
            });
        });

        describe('remove()', function() {
            // Monitors remove calls
            beforeEach(function(done) {
                if (spies.remove)
                    spies.remove.restore();

                spies.create('remove', Records, 'remove');
                controller.remove();
                done();
            });

            it('should remove a record', function(done) {
                expect(spies.remove).to.have.been.calledWith(record._id);
                done();
            });
        });
    });
});
