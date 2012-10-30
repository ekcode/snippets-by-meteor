
Snippets = new Meteor.Collection("snippets");

if (Meteor.isClient) {
	Template.header.title = function () {
		return "My Snippets";
	};

	Template.inputarea.snippets = function () {
		return Snippets.find({},{sort:{regdate:-1}});
	};

	Template.inputarea.events({
		'click #btnInsert': function () {
			var content = $('#txtContent').val();
			Snippets.insert({content:content, regdate:new Date().getTime()});
		}
	});

	Template.inputarea.events({
		'click .btnRemove': function () { 
            console.debug(this._id);
			Snippets.remove({_id:this._id});
		}
    });

	Template.admin.events({
		'click #btnRemoveAll': function () {
			Snippets.remove({});
		}
	});

}


if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
