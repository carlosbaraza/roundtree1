import { Meteor } from 'meteor/meteor';
import { Galleries } from '/imports/api/galleries/galleries.js';

Galleries.allow({
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
