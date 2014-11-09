Template.loginPopup.events({
  'submit #login-form': function (e) {
    e.preventDefault();
    // retrieve the input field values
    var email = $(e.target).find('#login-email').val(),
      password = $(e.target).find('#login-password').val();

    // Trim and validate your fields here....

    // If validation passes, supply the appropriate fields to the
    // Meteor.loginWithPassword() function.
    loginError('remove', 'email');
    loginError('remove', 'password');
    Meteor.loginWithPassword(email, password, function (err) {
      if (err) {
        if (err.reason == 'Incorrect password') {
          loginError('add', 'password', 'Mot de passe incorect')
        } else if (err.reason == 'Match failed') {
          loginError('add', 'email', 'Email inconnu.');
        } else {
          loginError('add', 'email', err.reason);
        }
      } else {
        $('.login-popup').hide();
        Flash.success('Connexion réussie.')
      }
    });
    return false;
  },
  'click #register-button': function (e) {
    e.preventDefault();
    var $form = $(e.target).closest('#login-form'),
      email = $form.find('#login-email').val(),
      password = $form.find('#login-password').val();

    if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      loginError('add', 'email', 'Email invalide.');
      return false;
    }

    loginError('remove', 'email');
    loginError('remove', 'password');
    Accounts.createUser({email: email, password: password}, function (err) {
      if (err) {
        if (err.reason == 'Password may not be empty') {
          loginError('add', 'password', 'Entrez un mot de passe.')
        } else if (err.reason == 'Email already exists.') {
          loginError('add', 'email', 'Cet email existe déjà. Essayez de vous connecter.');
        } else {
          loginError('add', 'email', err.reason);
        }
      } else {
        $('.login-popup').hide();
        Flash.success('Bienvenue ' + Meteor.user().emails[0].address + '. Vous êtes désormais inscrit sur Activ\'action !')
      }

    });

    return false;
  }
});

function loginError(action, type, message) {
  var $form = $('#login-form');
  if (!message) message = '';

  var selectors = {email: '#login-email', password: '#login-password'};

  if (action == 'add') {
    $form.find(selectors[type]).addClass('invalid');
    $form.find(selectors[type]).closest('label').addClass('state-error');
    $form.find(selectors[type]).closest('label').next('.input-error').text(message).show();
  }
  if (action == 'remove') {
    $form.find(selectors[type]).removeClass('invalid');
    $form.find(selectors[type]).closest('label').removeClass('state-error');
    $form.find(selectors[type]).closest('label').next('.input-error').text(message).hide();
  }
}