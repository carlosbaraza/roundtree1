import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import toastr from 'toastr';
import { withRouter } from 'react-router';

import GalleryFile from '/imports/ui/components/GalleryFile.jsx';
import { Galleries } from '/imports/api/galleries/galleries.js';

const styles = {
  button: {
  },
  paper: {
    padding: 20,
    paddingTop: 0,
    display: 'block',
    backgroundColor: 'rgba(255, 255, 255, .96)'
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
    fontSize: 0
  },
};

class NewGallery extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  handleInputImages(event) {
    const files = event.nativeEvent.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    Array.prototype.map.call(files, file => {
      // Only process image files.
      if (!file.type.match('image.*')) {
        toastr.error(`Some files are not images`);
        return null;
      }

      if (!this.props.gallery) {
        const galleryId = Galleries.insert({
        });
        this.props.router.push(`/?galleryId=${galleryId}`)
      }

      this.addFile(file);
    });

    // Reset input
    event.nativeEvent.target.value = '';
  }

  addFile(file) {
    if (this.state.files.filter(f => f.name === file.name).length) {
      toastr.error(`Some files were already uploaded`);
      return null;
    }
    let files = this.state.files;
    files.push(file);
    this.setState({files});
  }

  renderFiles() {
    if (!this.state.files.length) return null;

    return (
      <List style={{marginTop: 20}}>
        <Subheader>Uploaded images</Subheader>

        {(() => {
          return this.state.files.map(file => {
            return (
              <GalleryFile
                key={file.name}
                file={file}
                gallery={this.props.gallery}
              />
            );
          });
        })()}
      </List>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="new-gallery-container">
        <div className="new-gallery-bg">
          <img src="/img/bg-200KB.jpg" />
        </div>

        <div className="new-gallery-container-inner">
          {(() => {
            if (loading) {
              return (
                <CircularProgress
                  size={2}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                  }}
                />
              );
            } else {
              return (
                <div className="new-gallery-outer">
                  <Paper style={styles.paper} zDepth={3} className="new-gallery-inner">
                    <div>
                      <TextField
                        floatingLabelText="Your gallery name"
                        fullWidth={true}
                        onChange={event => {
                          this.props.toggleAppBar(true);
                          this.props.setAppBarTitle(event.nativeEvent.target.value);
                        }}
                      />
                    </div>

                    <RaisedButton
                      label="images"
                      labelPosition="before"
                      primary={true}
                      icon={<CloudUpload />}
                      style={styles.button}
                      fullWidth={true}
                    >
                      <input
                        className="file-chooser"
                        type="file"
                        style={styles.imageInput}
                        multiple={true}
                        onChange={this.handleInputImages.bind(this)}
                      />
                    </RaisedButton>

                    {(() => {
                      if (this.props.gallery) {
                        return (
                          <TextField
                            floatingLabelText="Gallery link"
                            fullWidth={true}
                            value={`https://gallery.carlosbaraza.com/gallery/${this.props.gallery._id}`}
                            onChange={event => {
                            }}
                          />
                        );
                      }
                    })()}

                    {this.renderFiles()}
                  </Paper>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

NewGallery.propTypes = {
  gallery: PropTypes.object
};

export default withRouter(NewGallery);
