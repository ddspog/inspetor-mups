import { Accounts } from 'meteor/accounts-base';

export class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.isStepTwo = false;
    this.credentials = {
        profile: {
            name: ''
        },
        password: '',
        phone: '+55'
    };
    this.verificationCode = '';
    this.error = '';
  }

  verifyPhone() {
      Accounts.createUserWithPhone(this.credentials, this.$bindToContext((err) => {
          if(err) {
              // display error and reason
              this.error = err.reason || err;
          } else {
              this.error = '';
              this.isStepTwo = true;
              // this.requestVerification();
          }
      }));
  }

  requestVerification() {
      Accounts.requestPhoneVerification(this.credentials.phone, this.$bindToContext((err) => {
          if (err) {
              // display also reason of Meteor.Error
              this.error = err.reason || err;
          } else {
              this.error = '';
              // move to code verification
              this.isStepTwo = true;
          }
      }));
  }

  verifyCode() {
    Accounts.verifyPhone(this.credentials.phone, this.verificationCode, this.$bindToContext((err) => {
      if (err) {
        if(Accounts.isPhoneVerified) {
            // redirect to parties list
            this.$state.go('parties');
        } else {
            this.error = err.reason || err;
        }
      } else {
          // redirect to parties list
          this.$state.go('parties');
      }
    }));
    /*
    if (logged) {
      Accounts.changePassword('', this.credentials.password, this.$bindToContext((err) => {
          if (err) {
              if(Accounts.isPhoneVerified) {
                  // redirect to parties list
                  this.$state.go('parties');
              } else {
                  this.error = err.reason || err;
              }
          } else {
              // redirect to parties list
              this.$state.go('parties');
          }
      }
      })); */
  }
}
