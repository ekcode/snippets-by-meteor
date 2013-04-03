
Snippets = new Meteor.Collection("snippets");

Meteor.publish("users", function () {
    return Meteor.users.find({},{sort:{username:1}});
});

Meteor.startup(function () {
});
