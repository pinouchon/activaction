Tag = {};
Tag.collection = new Meteor.Collection('Tags');

Tag.schema = new SimpleSchema({
  name: {
    type: String,
    max: 255,
    label: 'Nom de l\'évènement'
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

Tag.collection.attachSchema(Tag.schema);

//Tag.collection.allow({
//  update: ownsDocument,
//  remove: ownsDocument,
//  insert: function () {
//    return true;
//  }
//});

Tag.upsertAndMapIds = function(names) {
  return names.map(function() {
    Tag.collection.findOne()
  });
};

Tag.collection.allow({
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  insert: function () {
    return true;
  }
});