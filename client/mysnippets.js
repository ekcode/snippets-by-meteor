
Snippets = new Meteor.Collection("snippets");

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
        Snippets.insert({content:content, regTimestamp:date.getTime(),  regdate:date.toLocaleDateString()});
    }
});

Template.inputarea.events({
    'click .btnRemove': function () { 
        Snippets.remove(this._id);
    }
});

Template.admin.events({
    'click #btnRemoveAll': function () {
        Snippets.remove({});
    }
});
