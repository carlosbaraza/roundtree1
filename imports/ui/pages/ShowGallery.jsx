import React, { Component } from 'react';
import Gallery from '/imports/ui/components/Gallery.jsx';

import CircularProgress from 'material-ui/CircularProgress';

export default class ShowGallery extends Component {
  render() {
    const style = {
      container: {
        position: 'relative'
      },
      spinner: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    if (this.props.imagesReady) {
      return (
        <div>
          <Gallery images={this.props.images} />
        </div>
      );
    }
    return (
      <div className="show-gallery-container" style={style.container}>
        <div className="show-gallery">
          <CircularProgress
            size={100}
            thickness={8}
            style={style.spinner}
          />
        </div>
      </div>
    );
  }
}
