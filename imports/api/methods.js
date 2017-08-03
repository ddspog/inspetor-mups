import {
    Meteor
} from 'meteor/meteor';

import {
    Accounts
} from 'meteor/accounts-base';

export function verifyUserEmail() {
    if (!this.userId) {
        throw new Meteor.Error(400, "O usuário deve estar logado.");
    }

    Accounts.sendVerificationEmail(this.userId);
}

export function forgotPasswordEmail(email) {
    if (!email) {
        throw new Meteor.Error(400, "Email alvo vazio ou inválido.");
    }

    let userFound = Accounts.findUserByEmail(email);
    Accounts.sendResetPasswordEmail(userFound._id);
}

Meteor.methods({
    verifyUserEmail,
    forgotPasswordEmail
});
