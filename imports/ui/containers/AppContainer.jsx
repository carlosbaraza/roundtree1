import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Galleries } from '/imports/api/galleries/galleries.js';

import App from '../layouts/App.jsx';

export default createContainer(props => {
  if (props.location.query.galleryId) {
    const galleryHandler = Meteor
      .subscribe('gallery', props.location.query.galleryId);
  }

  return {
    gallery: Galleries.findOne({_id: props.location.query.galleryId}),
    connected: Meteor.status().connected
  };
}, App);
