import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyImage.html';
import {
  Images, Thumbs
} from '../../../api/images/index';
import {
    name as DisplayImageFilter 
} from '../../filters/displayImage/displayImageFilter';

class PartyImage {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    this.helpers({
      mainImage() {
          const image = this.getReactively('image', true);
          if (image) {
            console.log("Searching image: " + image);

            let picture = Images.findOne({
                _id: image
            });

            console.log("Found picture with ID: " + picture._id);
            console.log("Images with " + Images.find().fetch().size + " pictures");

            return picture.bin;
          }
      },

      thumbImage() {
          const image = this.getReactively('image', true);
          if (image) {
            /*
              return Thumbs.findOne({
                  originalCollection: 'images',
                  originalId: image
              }).bin;
            */
              return undefined;
          }
      }
    });
  }
}

const name = 'partyImage';

// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayImageFilter
]).component(name, {
  template,
  bindings: {
    image: '<'
  },
  controllerAs: name,
  controller: PartyImage
});
