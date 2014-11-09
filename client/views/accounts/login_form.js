AutoForm.hooks({
  loginForm: {
    onSubmit: function (doc) {
      Meteor.loginWithPassword(doc.email, doc.password, function (err) {
        Flash.clear();
        $('#loginForm [type=submit]').prop('disabled', false);
        if (err) {
          if (err.reason == 'User not found') {
            Flash.error('Cet utilisateur n\'existe pas', 'login');
          } else if (err.reason == "Incorrect password") {
            Flash.error('Mot de passe incorect', 'login');
          } else {
            Flash.error('Erreur inconnue: ' + err.reason, 'login')
          }
        } else {
          Flash.success('Connexion réussie.');
        }
      });
      return false;
    }
  }
});