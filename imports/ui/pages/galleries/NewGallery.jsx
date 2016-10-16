import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import GalleryFile from '/imports/ui/components/GalleryFile.jsx';

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

export default class NewGallery extends Component {
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
        console.error('The file is not an image');
        return null;
      }

      this.addFile(file);
    });

    // Reset input
    event.nativeEvent.target.value = '';
  }

  addFile(file) {
    if (this.state.files.filter(f => f.name === file.name).length) {
      console.error('File already uploaded');
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
};
