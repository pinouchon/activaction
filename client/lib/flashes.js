// flashes provides an api for temporary flash messages stored in a
// client only collection
Flash = {};
Flash.collection = new Meteor.Collection(null);

// create given a message and optional type creates a Flash message.
Flash.create = function (message, type, where) {
  type = (typeof type === 'undefined') ? 'error' : type;
  where = (typeof where === 'undefined') ? 'main' : where;
  if (type == 'error') type = 'danger';
  // Store errors in the 'Errors' local collection
  Flash.collection.insert({message: message, type: type, where: where, seen: false, show: true});
};

// error is a helper function for creating error messages
Flash.error = function (message, where) {
  return Flash.create(message, 'error', where);
};

// success is a helper function for creating success messages
Flash.success = function (message, where) {
  return Flash.create(message, 'success', where);
};

// info is a helper function for creating info messages
Flash.info = function (message, where) {
  return Flash.create(message, 'info', where);
};

Flash.warning = function (message, where) {
  return Flash.create(message, 'warning', where);
};

// clear hides viewed message
Flash.clear = function () {
  //Flash.collection.update({seen: true}, {$set: {show: false}}, {multi: true});
  Flash.collection.remove({});
};
