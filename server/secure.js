
Snippets.allow({
    insert: function(userId, doc) {
        return !!Meteor.user();
    },
    remove: function(userId, docs) {
        return _.all(docs, function(doc) {
            return doc.user._id === userId;
        });
    }

});

Snippets.deny({});
