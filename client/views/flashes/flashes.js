Template.flashes.helpers({
  flashes: function() {
    return Flash.collection.find({where: 'main'});
  },
  flashesCount: function() {
    return Flash.collection.find({where: 'main'}).count();
  }
});