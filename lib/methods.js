Meteor.methods({
  //register: function (doc) {
  //  console.log('a');
  //  //if (Meteor.isServer) {
  //  //Accounts.createUser(doc);
  //  //}
  //  if (Meteor.isClient) {
  //    console.log('creating user...', doc);
  //    Accounts.createUser(doc, function (err) {
  //      console.log('cb createUser', err);
  //      Meteor.loginWithPassword(doc.email, doc.password, function (e) {
  //        console.log(e)
  //      });
  //    });
  //  }
  //},
  emailAvailable: function (email) {
    return Meteor.users.find({
          _id: {$ne: Meteor.user() && Meteor.user()._id || ''},
          emails: {$elemMatch: {address: email}}
        }).count() == 0;
  },
  usernameAvailable: function (username) {
    return Meteor.users.find({
          _id: {$ne: Meteor.user() && Meteor.user()._id || ''},
          username: username
        }).count() == 0;
  }
});