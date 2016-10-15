import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import _ from 'lodash';

const styles = {
  button: {
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
  render() {
    const { loading } = this.props;

    return (
      <div className="new-gallery-container">
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
              <div className="new-gallery">
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
                  />
                </RaisedButton>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

NewGallery.propTypes = {
};
