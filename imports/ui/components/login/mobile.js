export class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            user: {
                phone: ''
            },
            password: ''
        };
        this.error = '';
    }

    loginUser() {
        Meteor.loginWithPhoneAndPassword(this.credentials.user, this.credentials.password, this.$bindToContext((err) => {
            if (err) {
                // display also reason of Meteor.Error
                this.error = err.reason || err;
            } else {
                this.error = '';
                // redirect to parties list
                this.$state.go('parties');
            }
        }));
    }
}
