
Snippets.allow({
    insert: function(userId, doc) {
        return (userId && doc.owner === userId);
    },
    fetch: ['owner']

});

Snippets.deny({});
