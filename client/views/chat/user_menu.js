Template.userMenu.helpers({
  userList: function () {
    return Meteor.users.find({_id: {$ne: Meteor.user()._id}}, {sort: {'status.online': -1}});
  },
  userEmail: function () {
    return this.emails && this.emails[0] && this.emails[0].address;
  },
  userStatus: function () {
    return this.status && this.status.online ?
    {label: 'Online', class: 'label-success'} :
    {label: 'Offline', class: 'label-default'};
  }
});

Template.userMenu.events({
  'click .user-menu-item': function () {
    var messagesSeen = Meteor.user().messagesSeen || {};
    messagesSeen[this._id] = new Date();
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {chattingWith: this._id, messagesSeen: messagesSeen}});
    Meteor.subscribe('messages', Meteor.user().chattingWith);
    Meteor.setTimeout(function() {Template.chatWindow.scrollDown();}, 0);
    $('.chat-window').show();
    //console.log('chattingWith: ', this._id);
  }
});