import { s3Credentials } from '/imports/api/aws/s3.js';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  s3Credentials(filename) {
    const config = {
      region: 'eu-west-1',
      bucket: 'roundtree-images',
      accessKey: process.env.S3_ACCESS_KEY,
      secretKey: process.env.S3_SECRET_KEY
    };

    return s3Credentials(config, filename);
  }
});
