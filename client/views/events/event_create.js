Template.eventCreate.rendered = function () {
  Meteor.setTimeout(function () {
    $('#datepicker').datepicker({
      dateFormat: 'dd/mm/yy',
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>'
    });
  });
  $('#eventCreateForm [name="hour"]').mask('99h99', {
    placeholder: '_'
  });

};

AutoForm.hooks({
  eventCreateForm: {
    docToForm: function (doc) {
      if (_.isArray(doc.tags)) {
        doc.tags = doc.tags.join(", ");
      }
      return doc;
    },
    formToDoc: function (doc) {
      if (typeof doc.tags === "string") {
        doc.tags = doc.tags.split(",").map(function(tag) {
          Tag.collection.upsert({name: ''})
        });
      }
      return doc;
    }
  }
});