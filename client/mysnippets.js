
Snippets = new Meteor.Collection("snippets");


Template.header.title = function () {
    return "My Snippets";
};

Template.contentTemplate.snippets = function () {
    return Snippets.find({"user._id":Meteor.userId()},{sort:{regTimestamp:-1}});
};

Template.inputTemplate.events({
    'click #btnInsert': function () {
        var content = $('textarea').val();
        var title = '';
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

        Snippets.insert({title:title,
            content:content,
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
    'click .btnUpdate': function () { 
        Snippets.update({_id:this._id}, {content:'updated contents'});
    }
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

Meteor.startup(function() {
    $.getScript('http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJava.js')
    .done(function(script, textStatus) {
        SyntaxHighlighter.all();
        console.log(textStatus);
    });
});
