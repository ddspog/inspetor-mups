import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyImage.html';
import { Images } from '../../../api/images/index';
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
          return Images.findOne({
            _id: image
          });
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
