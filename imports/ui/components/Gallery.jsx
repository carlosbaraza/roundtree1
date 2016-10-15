import React, { Component, PropTypes } from 'react';

import JustifiedGallery from 'react-grid-gallery';

export default class Gallery extends Component {
    render() {
        return (
            <div className="gallery">
                <h1>Your Mum</h1>
                <JustifiedGallery images={this.props.images}
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