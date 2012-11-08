
Template.loginForm.events({
    'click #signupBtn': function () {
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();

        Accounts.createUser({'username':username, 'password':password});
    },

    'click #loginBtn': function () {
        var username = $('#loginUsername').val();
        var password = $('#loginPassword').val();

        Meteor.loginWithPassword(username, password);
    }
});

