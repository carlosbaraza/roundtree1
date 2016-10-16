import { Meteor } from 'meteor/meteor';
import { Images } from '/imports/api/images/images.js';
import { Galleries } from '/imports/api/galleries/galleries.js';

Meteor.publish('gallery', function galleryPublication(galleryId) {
    return [
        Galleries.find({_id: galleryId}),
        Images.find({galleryId})
    ];
});
