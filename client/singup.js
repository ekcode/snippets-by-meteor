
Template.loginForm.events({
    'click #signupBtn': function () {
        var email = $('#inputEmail').val();
        var emailre = $('#inputEmailRe').val();
        var password = $('#inputPassword').val();

        Accounts.createUser({'username':email, 'password':password});
    },

    'click #loginBtn': function () {
        var email = $('#loginEmail').val();
        var password = $('#loginPassword').val();

        Meteor.loginWithPassword(email, password);
    }
});

