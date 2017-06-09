import {
    name as PartyRemove
} from '../partyRemove';
import {
    Parties
} from '../../../../api/records';

import 'angular-mocks';

import {
    LoadController
} from '../../../modules/load/load';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('PartyRemove', function() {
    // Initialize module
    beforeEach(function(done) {
        window.module(PartyRemove);
        spies.restoreAll();
        done();
    });

    // Test inside controller
    describe('controller', function() {
        let controller;
        const party = {
            _id: 'partyId'
        };

        // Initialize controller
        beforeEach(function(done) {
            LoadController(PartyRemove, function(component) {
                controller = component;
            }, done, {
                party
            });
        });

        describe('remove()', function() {
            // Monitors remove calls
            beforeEach(function(done) {
                if (spies.remove)
                    spies.remove.restore();

                spies.create('remove', Parties, 'remove');
                controller.remove();
                done();
            });

            it('should remove a party', function(done) {
                expect(spies.remove).to.have.been.calledWith(party._id);
                done();
            });
        });
    });
});
