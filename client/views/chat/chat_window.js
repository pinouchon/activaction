Template.chatWindow.helpers({
  messages: function () {
    if (!Meteor.user()) return;
    return Message.collection.find({
          $or: [
            {
              $and: [
                {userId: Meteor.user()._id},
                {partnerId: Meteor.user().chattingWith}
              ]
            },
            {
              $and: [
                {partnerId: Meteor.user()._id},
                {userId: Meteor.user().chattingWith}
              ]
            }
          ]
        },
        {sort: {createdAt: 1}});
  },
  leftRight: function () {
    if (!Meteor.user()) return;
    return this.userId == Meteor.user()._id ? 'right' : 'left';
  },
  userName: function () {
    //console.log('user:::', this.userId);
    return Meteor.users.findOne({_id: this.userId}).username;//emails[0].address.match(/^[a-zA-Z0-9]+/)[0];
  },
  messageTime: function () {
    moment.locale('fr');
    var createdAt = new Date(this.createdAt);
    if (createdAt > (new Date()).getDate() - 1000 * 60 * 60 * 24) {
      return moment(createdAt).fromNow();
    } else {
      return moment(createdAt).format("Do MMMM H:mm");
    }
  },
  chattingWithName: function () {
    var user = User.collection.findOne({_id: Meteor.user() && Meteor.user().chattingWith});
    return user && user.username;
  }
});

Template.chatWindow.sendMessage = function () {
  var $chatBox = $('.chat-window .chat-box'), message = $chatBox.val();
  $chatBox.val('');
  Message.send(Meteor.user()._id, Meteor.user().chattingWith, message);
  Template.chatWindow.scrollDown();
};

Template.chatWindow.scrollDown = function () {
  var $window = $(".chat-messages");
  $window.scrollTop($window[0].scrollHeight + 10000);
};

Template.chatWindow.rendered = function () {
  if (Meteor.user() && Meteor.user().chattingWith) Meteor.subscribe('messages', Meteor.user().chattingWith);
  $('body').not('.login').click(function (e) {
    if (!$(e.target).closest('.chat-window').length && !$(e.target).closest('.user-menu-item').length) {
      $('.chat-window').hide();
    }
    return true;
  });

  Message.collection.find().observe({
    added: function (obj) {
      if (Meteor.user() && Meteor.user().chattingWith == obj.userId) {
        Meteor.setTimeout(function () {
          Template.chatWindow.scrollDown();
        }, 0);
      }
    }
  })
};

Template.chatWindow.events({
  'keypress .chat-box': function (e) {
    if (e.which === 13) { // enter
      e.preventDefault();
      Template.chatWindow.sendMessage();
      return false;
    }
    return true;
  },
  'blur .chat-box, focus .chat-box': function() {
    Template.userMenu.refeshCount(User.collection.findOne({_id: Meteor.user().chattingWith}));
    return true;
  },
  'click .chat-button': function (e) {
    e.preventDefault();
    Template.chatWindow.sendMessage();
    return false;
  },
  'click .close-window': function (e) {
    e.preventDefault();
    $('.chat-window').hide();
    return false;
  }
});