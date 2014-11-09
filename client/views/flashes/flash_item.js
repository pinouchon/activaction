// When the template is first created
Template.flashItem.created = function () {
  // Get the ID of the messsage
  var id = this.data._id;
  Meteor.setTimeout(function () {
    // mark the flash as "seen" after 100 milliseconds
    Flash.collection.update(id, {$set: {seen: true}});
  }, 100);
}