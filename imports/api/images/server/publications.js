import { Meteor } from 'meteor/meteor';
import { Images } from '/imports/api/images/images.js';

Meteor.publish('images', function imagesPublication() {
    return Images.find();
});
