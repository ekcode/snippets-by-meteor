
Snippets = new Meteor.Collection("snippets");
Session.set("loginUser", "Kwon")

Template.header.title = function () {
    return "My Snippets";
};

Template.inputarea.snippets = function () {
    return Snippets.find({},{sort:{regTimestamp:-1}});
};

Template.inputarea.events({
    'click #btnInsert': function () {
        var content = $('textarea').val();
        var date = new Date();
        if(!content.length) {
            return;
        }
        Snippets.insert({content:content,
            regTimestamp:date.getTime(),
            regdate:date.toLocaleDateString(),
            user:Meteor.user()});
        $('textarea').val('').focus();
    },
    'click .btnRemove': function () { 
        Snippets.remove(this._id);
    },
    'click .btnUpdate': function () { 
        Snippets.update({_id:this._id}, {content:'updated contents'});
    }
});

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

