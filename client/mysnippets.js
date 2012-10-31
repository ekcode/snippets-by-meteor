
Snippets = new Meteor.Collection("snippets");

Template.header.title = function () {
    return "My Snippets";
};

Template.inputarea.snippets = function () {
    return Snippets.find({},{sort:{regdate:-1}});
};

Template.inputarea.events({
    'click #btnInsert': function () {
        console.log("^^");
        var content = $('#txtContent').val();
        Snippets.insert({content:content, regdate:new Date().getTime()});
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
