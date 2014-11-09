Template.loginFlashes.helpers({
  flashes: function() {
    return Flash.collection.find({where: 'login'});
  },
  flashesCount: function() {
    return Flash.collection.find({where: 'login'}).count();
  }
});