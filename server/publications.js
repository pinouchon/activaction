Meteor.publish('messages', function (partnerId) {
  return Message.collection.find({
    $or: [{
      $and: [
        {userId: this.userId},
        {partnerId: partnerId}
      ]
    }, {
      $and: [
        {partnerId: this.userId},
        {userId: partnerId}
      ]
    }]
  }, {
    limit: 20,
    sort: {createdAt: -1}
  });
});
Meteor.publish(null, function () {
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, status: 1, chattingWith: 1, messagesSeen: 1}});
});