import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ShowGallery from '/imports/ui/pages/ShowGallery.jsx';
import { Images } from '/imports/api/images/images.js';

export default createContainer(props => {
    const imagesHandler = Meteor.subscribe('images');

    return {
        imagesReady: imagesHandler.ready(),
        images: Images.find({gallery: props.params.galleryId}).fetch()
    };
}, ShowGallery);
