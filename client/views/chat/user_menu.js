Template.userMenu.helpers({
  userList: function () {
    return Meteor.users.find(
        {_id: {$ne: Meteor.user() && Meteor.user()._id}},
        {sort: {'status.online': -1}});
  },
  userStatus: function () {
    return this.status && this.status.online ?
    {label: 'Online', class: 'label-success'} :
    {label: 'Offline', class: 'label-default'};
  },
  unseenCount: function() {
    if (!Meteor.user()) return '?';
    var messagesSeen = Meteor.user().messagesSeen || {};
    return Message.collection.find({
      userId: this._id,
      createdAt: {$gt: messagesSeen[this._id] || 0}
    }).count();
  }
});

Template.userMenu.refeshCount = function(targetUser) {
  var messagesSeen = Meteor.user().messagesSeen || {};
  messagesSeen[targetUser._id] = new Date();
  Meteor.users.update({_id: Meteor.user()._id}, {$set: {chattingWith: targetUser._id, messagesSeen: messagesSeen}});
};

Template.userMenu.events({
  'click .user-menu-item': function () {
    if (!Meteor.user()) {
      Flash.error('You devez vous connecter pour chatter avec un autre membre.');
      return false;
    }
    Template.userMenu.refeshCount(this);
    Meteor.subscribe('messages', Meteor.user().chattingWith);
    Meteor.setTimeout(function () {
      Template.chatWindow.scrollDown();
    }, 0);
    $('.chat-window').show();
  }
});