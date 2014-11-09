//function (attr) {
//  var k, v;
//  console.log('A')
//  if (attr == null) {
//    attr = {};
//  }
//  console.log('B')
//  this.errors = false;
//  for (k in attr) {
//    v = attr[k];
//    this[k] = v;
//  }
//  console.log('C')
//  if (!this.isValid()) {
//    console.log(this.error_message());
//    return this;
//  }
//  console.log('D')
//  if (this.id != null) {
//    console.log('E', 'updating', this.id, '==', attr)
//    this.constructor._collection.update(this.id, {
//      $set: attr
//    });
//  } else {
//    console.log('F')
//    this.id = this._id = this.constructor._collection.insert(attr);
//  }
//  console.log('G')
//  if (this.constructor.after_save) {
//    console.log('H')
//    this.constructor.after_save(this);
//  }
//  return this;
//}