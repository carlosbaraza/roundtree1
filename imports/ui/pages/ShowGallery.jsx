import React, { Component } from 'react';
import Gallery from '/imports/ui/components/Gallery.jsx';

import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class ShowGallery extends Component {
    render() {
        const style = {
            container: {
                position: 'relative'
            },
            refresh: {
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
                    <RefreshIndicator
                        size={100}
                        left={0}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={style.refresh}
                    />
                </div>
            </div>
        );
    }
}
