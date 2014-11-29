Template.aaFormField.helpers({
  placeholder: function () {
    return User.registerSchema.label(this.field) || Event.schema.label(this.field);
  }
});