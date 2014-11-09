Template.menu.events({
  'click .logout': function() {
    Meteor.logout();
    return false;
  }
});