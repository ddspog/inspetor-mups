import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import 'angular-sortable-view';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';

import {Meteor} from 'meteor/meteor';

import webTemplate from './web.html';
import {PartyUpload as PartyUploadWeb} from './web';
import mobileTemplate from './mobile.html';
import {PartyUpload as PartyUploadMobile} from './mobile';

const name = 'partyUpload';

const template = Meteor.isCordova ? mobileTemplate : webTemplate;
const controller = Meteor.isCordova ? PartyUploadMobile : PartyUploadWeb;

// create a module
export default angular.module(name, [
    angularMeteor,
    ngFileUpload,
    'ngImgCrop',
    'angular-sortable-view'
]).component(name, {
    template,
    controller,
    controllerAs: name,
    bindings: {
        file: '=?',
        control: '=?'
    }
});
