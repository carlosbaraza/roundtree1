import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';

import $ from 'jquery';
require('blueimp-file-upload');

export default class GalleryFile extends Component {
  constructor(props) {
    super();

    this.state = {
      imgUrl: null,
      uploadProgress: 0,
      ETag: props.ETag
    }

    if (!props.ETag) {
      this.uploadToAWS(props.file);
    }
  }

  uploadToAWS(file) {
    // Configuration
    var bucket = 'roundtree-images';
    // client-side validation by fileUpload should match the policy
    // restrictions so that the checks fail early
    var acceptFileType = /.*/i;
    var maxFileSize = 1000000;

    console.log($(file));
    try {
      const $file = $(file);

      // Configure fileuploader
      $file
        .fileupload({
          acceptFileTypes: acceptFileType,
          maxFileSize: maxFileSize,
          url: 'https://' + bucket + '.s3.amazonaws.com',
          paramName: 'file',
          dataType: 'xml',
          add: (e, data) => {
            const filename = data.files[0].name;
            const params = [];

            Meteor.call('s3Credentials', filename, (err, s3Data) => {
              if (err) {
                console.error('Error generating policy', err);
              }
              data.formData = s3Data.params;
              data.formData['Content-Type'] = file.type;
              data.submit();
            });

            return params;
          },
          fail: (e, data) => {
            console.error('Error uploading file', e, data);
            this.setState({uploadProgress: -1});
          },
          progress: (e, data) => {
            const uploadProgress = parseInt(data.loaded / data.total * 100, 10);
            this.setState({uploadProgress});
          },
          done: (e, data) => {
            var s3Url = $(data.jqXHR.responseXML).find('Location').text();
            var s3Key = $(data.jqXHR.responseXML).find('Key').text();
            this.setState({uploadProgress: 100})
          }
        });

      // POST the file
      $file.fileupload('add', {files: [file]});
    } catch(e) {
      console.log(e);
    }

  }

  componentDidMount() {
    const reader = new FileReader();

    reader.onload = event => {
      this.setState({
        imgUrl: event.target.result
      });
    };

    // Read in the image file as a data URL.
    reader.readAsDataURL(this.props.file);
  }

  isUploading() {
    return this.state.uploadProgress >= 0 && this.state.uploadProgress < 100;
  }

  render() {
    const { file } = this.props;

    return (
      <ListItem
        primaryText={file.name}
        secondaryText={(() => {
          if (this.state.uploadProgress === -1) {
            return <span style={{color: '#FF0000'}}>Error</span>
          } else if (this.isUploading()) {
            return <LinearProgress
              mode="determinate"
              value={this.state.uploadProgress}
              style={{
                height: 3,
                marginTop: 15
              }}
            />;
          }
          return 'Uploaded';
        })()}
        leftAvatar={<Avatar src={(() => {
            if (this.state.imgUrl) {
              return this.state.imgUrl;
            } else {
              return null;
            }
          })()} />}
        disabled={true}
      >
        <IconButton
          tooltip="Remove from gallery"
          style={{
            position: 'absolute',
            top: this.isUploading() ? 4 : 15,
            right: 0,
          }}
        >
          <ActionDelete />
        </IconButton>
      </ListItem>
    );
  }
}

GalleryFile.propTypes = {
  file: PropTypes.object
}
