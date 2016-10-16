import { Meteor } from 'meteor/meteor';
import { Images } from '/imports/api/images/images.js';

Images.allow({
  insert(userId, doc) {
    return true;
  },

  update(userId, doc, fieldNames, modifier) {
    return false;
  },

  remove(userId, doc) {
    return false;
  }
});
