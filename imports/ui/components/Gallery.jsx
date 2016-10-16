import React, { Component, PropTypes } from 'react';

import JustifiedGallery from 'react-grid-gallery';

export default class Gallery extends Component {
  render() {
    const images = this.props.images.map(image => {
      return {
        src: image.src,
        thumbnail: image.src,
        thumbnailWidth: image.thumbnailWidth,
        thumbnailHeight: image.thumbnailHeight,
        caption: image.caption
      };
    });

    return (
      <div className="gallery">
        <JustifiedGallery
          images={images}
          enableImageSelection={false}
          rowHeight={150}
          margin={1}
          showCloseButton={false}
          backdropClosesModal={true}
        />
      </div>
    );
  }
}
