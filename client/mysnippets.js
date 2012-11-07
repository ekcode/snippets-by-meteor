
Snippets = new Meteor.Collection("snippets");



Template.header.title = function () {
    return "My Snippets";
};

Template.inputarea.snippets = function () {
    return Snippets.find({"user._id":Meteor.userId()},{sort:{regTimestamp:-1}});
};

Template.inputarea.events({
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
    },
    'click .btnRemove': function () { 
        Snippets.remove(this._id);
    },
    'click .btnUpdate': function () { 
        Snippets.update({_id:this._id}, {content:'updated contents'});
    }
});

