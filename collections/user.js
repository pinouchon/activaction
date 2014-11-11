Meteor.users.allow({
  update: function (userId, obj) {
    return userId == obj._id;
  }
});

User = {};
//Schema = {};
User.profile = {};

User.profile.schema = new SimpleSchema({
  firstName: {
    type: String,
    label: "Prénom",
    regEx: /^[a-zA-Z-]{2,25}$/
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/
  },
  gender: {
    type: String,
    autoform: {
      options: [
        {label: "Homme", value: "male"},
        {label: "Femme", value: "female"}
      ]
    },
    allowedValues: ['male', 'female']
  },
  bio: {
    type: String,
    optional: true
  }
});

User.schema = new SimpleSchema({
  emails: {
    type: [Object],
    label: 'email',
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true
    //minCount: 1
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true
  },
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,50}$/,
    label: 'Pseudo',
    custom: function () {
      if (Meteor.isClient && this.isSet) {
        Meteor.call('usernameAvailable', this.value, function (error, result) {
          if (!result) {
            User.registerSchema.namedContext('registrationForm').addInvalidKeys([{
              name: 'username',
              type: 'notUnique'
            }]);
          }
        });
      }
    }
  },
  profile: {
    type: User.profile.schema,
    minCount: 1
    //optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // Add `roles` to your schema if you use the meteor-roles package.
  // Note that when using this package, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  chattingWith: {
    type: String,
    optional: true
  },
  messagesSeen: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

User.registerSchema = new SimpleSchema([User.schema, {
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    custom: function () {
      if (Meteor.isClient && this.isSet) {
        Meteor.call('emailAvailable', this.value, function (error, result) {
          if (!result) {
            User.registerSchema.namedContext('registrationForm').addInvalidKeys([{name: 'email', type: 'notUnique'}]);
          }
        });
      }
    }
  },
  password: {
    type: String,
    label: "Mot de passe",
    min: 3
  },
  passwordConfirmation: {
    type: String,
    label: "Confirmation",
    min: 3,
    custom: function () {
      if (this.value !== this.field('password').value) {
        return "passwordMismatch";
      }
    }
  }
}]);

User.loginSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email'
  },
  password: {
    type: String,
    label: "Mot de passe",
    min: 3
  }
});

User.collection = Meteor.users;
User.collection.attachSchema(User.schema);
if (Meteor.isClient) AutoForm.debug();



//Meteor.users.allow({
//  update: function(userId, obj) {
//    return userId == obj._id;
//  }
//});