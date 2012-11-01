
Snippets = new Meteor.Collection("snippets");

Template.header.title = function () {
    return "My Snippets";
};

Template.inputarea.snippets = function () {
    var snippets = Snippets.find({},{sort:{regdate:-1}});
    snippets.forEach(function (snippet) {
        var date = new Date(snippet.regdate);
        snippet.regdate2 = $.format.date(date.toString(), "yyyy년 MM월 dd일 HH:mm:ss");
    });

    return snippets;
};

Template.inputarea.events({
    'click #btnInsert': function () {
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
