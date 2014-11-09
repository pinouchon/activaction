Message = {};
Message.collection = new Meteor.Collection('messages');
Message.send = function (userId, partnerId, message) {
  Message.collection.insert({userId: userId, partnerId: partnerId, message: message, createdAt: new Date().getTime()});
};

Message.collection.allow({
  update: ownsDocument,
  remove: ownsDocument,
  insert: function () {
    return true;
  }
});