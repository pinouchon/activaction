Message = {};
Message.collection = new Meteor.Collection('messages');
Message.send = function (userId, partnerId, message) {
  Message.collection.insert({userId: userId, partnerId: partnerId, message: message}); //, createdAt: new Date().getTime()
};

Message.schema = new SimpleSchema({
  userId: {
    type: String
  },
  partnerId: {
    type: String
  },
  message: {
    type: String,
    max: 10000
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

Message.collection.attachSchema(Message.schema);

Message.collection.allow({
  update: ownsDocument,
  remove: ownsDocument,
  insert: function () {
    return true;
  }
});