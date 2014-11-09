AutoForm.hooks({
  registrationForm: {
    onSubmit: function (doc) {
      console.log('creating user...', doc);
      Accounts.createUser(doc, function (err) {
        console.log('cb createUser', err);
        if (err) {
          Flash.error(err.message);
        } else {
          Flash.success('Bienvenue ' + Meteor.user().emails[0].address + '. Vous êtes désormais inscrit sur Activ\'action !');
          //Flash.success('AAA');
          //Router.go('home');
          //Flash.success('BBB');
        }
      });
      return false;
    }
  }
});