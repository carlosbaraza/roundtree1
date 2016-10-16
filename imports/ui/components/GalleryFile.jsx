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
    // Configure The S3 Object
    AWS.config.region = 'eu-west-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:836f3cc7-2e23-4258-b566-a76c859e1ca1'
    });
    var bucket = new AWS.S3({
      params: {
        Bucket: 'roundtree-images'
      }
    });

    const awsParams = {
      Key: file.name,
      ContentType: file.type,
      Body: file,
      ServerSideEncryption: 'AES256'
    };

    return bucket
      .putObject(awsParams, (err, response) => {
        if (err) {
          console.error(err);
          this.setState({
            uploadProgress: -1
          });
          return false;
        }
        // Success!
        this.setState({
          ETag: response.ETag
        });
      })
      .on('httpUploadProgress', progress => {
        // Log Progress Information
        this.setState({
          uploadProgress: progress.loaded / progress.total * 100
        });
      });
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

  render() {
    const { file } = this.props;

    return (
      <ListItem
        primaryText={file.name}
        secondaryText={(() => {
          if (this.state.uploadProgress === -1) {
            return <span style={{color: '#FF0000'}}>Error</span>
          } else if (this.state.uploadProgress < 100) {
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
            top: this.state.uploadProgress < 100 ? 4 : 15,
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
