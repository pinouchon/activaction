Template.myLoginButton.rendered = function () {
  $('body').not('.login').click(function (e) {
    if (!$(e.target).closest('.login-popup').length && !$(e.target).closest('.login').length) {
      $('.login-popup').hide();
    }
    return true;
  });
};
Template.myLoginButton.events({
  'click .login': function (e) {
    e.preventDefault();
    $('.login-popup').toggle();
    return false;
  },
  'click .logout': function (e) {
    e.preventDefault();
    Meteor.logout(function(err) {
      if (err) {
        Flash.error('Erreur lors de la déconnexion.' + err.reason);
        console.log(err);
      } else {
        Flash.success('Vous êtes désormais déconnecté.')
      }
    });
  }
});

Template.myLoginButton.helpers({
  userEmail: function () {
    return Meteor.user() && Meteor.user().emails[0].address;
  }
});