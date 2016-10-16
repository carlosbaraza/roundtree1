import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ShowGallery from '/imports/ui/pages/ShowGallery.jsx';
import { Images } from '/imports/api/images/images.js';

export default createContainer(props => {
    const galleryHandler = Meteor.subscribe('gallery', props.params.galleryId);

    return {
        imagesReady: galleryHandler.ready(),
        images: Images.find().fetch()
    };
}, ShowGallery);
