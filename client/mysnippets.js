
Snippets = new Meteor.Collection("snippets");


Template.header.title = function () {
    return "My Snippets";
};

Template.header.events({
    'click .navItem': function (event) {
        $('.nav li').removeClass('active');
        $(event.target).parent().addClass('active');
    },
});

Template.contentTemplate.snippets = function () {
    //if($('#navPublic').hasClass('active')) {
    return Snippets.find({"user._id":Meteor.userId()},{sort:{regTimestamp:-1}});
};

// helper
Template.contentTemplate.isPublic = function () {
    return this.public == "Y";
}

Template.inputTemplate.events({
    'click #btnInsert': function () {
        var content = $('textarea').val();
        var title = '';
        var public = 'N';
        var lines = $('textarea').val().split('\n');
        if(lines[0].substring(0,2) == '//') {
            title = lines[0].substring(2);
            lines.shift(1);
            content = lines.join('\n');
        }

        var date = new Date();
        if(!content.length) {
            return;
        }

        if($('#chkPublic').attr('checked')) {
            public = 'Y'
        }

        Snippets.insert({title:title,
            content:content,
            public:public,
            regTimestamp:date.getTime(),
            regdate:date.toLocaleDateString(),
            user:Meteor.user()});
        $('textarea').val('').focus();
    }

});

Template.contentTemplate.events({
    'click .btnRemove': function () { 
        Snippets.remove(this._id);
    },
});

Template.loginForm.rendered = function() {
    $('#loginUsername').focus();
    $('#loginPassword').keypress(function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {
            $('#loginBtn').click();
        }
    });

    $('#inputPassword').keypress(function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {
            $('#signupBtn').click();
        }
    });
};

Template.inputTemplate.rendered = function() {
    console.log('focus to textarea');
    $('textarea').focus();
};

Template.contentTemplate.rendered = function() {
    SyntaxHighlighter.highlight();
};

Meteor.startup(function() {
});
