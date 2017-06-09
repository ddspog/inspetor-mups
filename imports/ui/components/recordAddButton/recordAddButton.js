import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './recordAddButton.html';
import modalTemplate from './recordAddModal.html';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import {
    name as RecordAddForm
} from '../recordAddForm/recordAddForm';

class RecordAddButton {
    constructor($mdDialog, $mdMedia) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
    }

    open(event) {
        this.$mdDialog.show({
            controller($mdDialog) {
                'ngInject';

                this.close = () => {
                    $mdDialog.hide();
                }
            },
            controllerAs: 'recordAddModal',
            template: modalTemplate,
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: this.$mdMedia('gt-sm') || this.$mdMedia('md')
                || this.$mdMedia('gt-md') || this.$mdMedia('lg')
                || this.$mdMedia('gt-lg') || this.$mdMedia('xl'),
            fullscreen: this.$mdMedia('sm') || this.$mdMedia('gt-xs') ||
                this.$mdMedia('xs')
        }).finally(function(){
            // Called on Exit of Modal, clicking on 'Close' or outside modal.
            // console.log('RecordAddModal has called ClickOutsideToClose');
        });
    }
}

const name = 'recordAddButton';

// create a module
export default angular.module(name, [
    angularMeteor,
    RecordAddForm
]).component(name, {
    template: buttonTemplate,
    controllerAs: name,
    controller: RecordAddButton
});
