import {
    name as PartyDetails
} from '../partyDetails';
import {
    Parties
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

describe('PartyDetails', function() {
    beforeEach(function(done) {
        window.module(PartyDetails);
        spies.restoreAll();
        done();
    });

    describe('controller', function() {
        let controller;
        const party = {
            _id: 'partyId',
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };

        beforeEach(function(done) {
            LoadController(PartyDetails, function(component) {
                controller = component;
            }, done);
        });

        describe('save()', function() {
            beforeEach(function(done) {
                if (spies.update)
                    spies.update.restore();
                spies.create('update', Parties, 'update');

                controller.party = party;
                controller.save();
                done();
            });

            it('should update a proper party', function(done) {
                expect(spies.update.lastCall.args[0]).to.be.deep.equal({
                    _id: party._id
                });
                done();
            });

            it('should update with proper modifier', function(done) {
                expect(spies.update.lastCall.args[1]).to.be.deep.equal({
                    $set: {
                        name: party.name,
                        description: party.description,
                        public: party.public,
                        location: party.location
                    }
                });
                done();
            });
        });
    });
});
