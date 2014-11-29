Event = {};
Event.collection = new Meteor.Collection('Events');

Event.schema = new SimpleSchema({
  userId: {
    type: String,
    autoValue: function () {
      return Meteor.user()._id;
    }
  },
  name: {
    type: String,
    max: 255,
    label: 'Nom de l\'évènement'
  },
  date: {
    type: Date,
    label: 'Date'
  },
  hour: {
    type: String,
    max: 255,
    label: 'Heure',
    optional: true
  },
  tags: {
    type: [String],
    //blackbox: true,
    optional: true,
    label: 'Tags'
  },
  description: {
    type: String,
    max: 10000,
    label: 'Description'
  },
  picture: {
    type: String,
    max: 1024,
    optional: true
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

Event.collection.attachSchema(Event.schema);

Event.collection.allow({
  update: ownsDocument,
  remove: ownsDocument,
  insert: function () {
    return true;
  }
});
