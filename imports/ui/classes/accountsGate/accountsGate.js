export class AccountsGate {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            email: ''
        };

        this.error = '';
    }
}
