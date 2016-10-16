import { Meteor } from 'meteor/meteor';
import { Images } from '/imports/api/images/images.js';

Meteor.methods({
  'images/insert'(options) {
    const { filename, galleryId } = options;

    const imageId = Images.insert({
      filename,
      galleryId
    });

    const image = Images.findOne({_id: imageId});

    return image;
  }
})
