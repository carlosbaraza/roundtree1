import { Meteor } from 'meteor/meteor';

export const Images = new Meteor.Collection('images');

// Define the schema
const schema = new SimpleSchema({
  filename: {
    type: String,
    label: "File name",
    max: 200
  },
  s3key: {
    type: String,
    label: "AWS S3 Key",
    autoValue() {
      if (this.isInsert) {
        return Random.id() + '-' + ((this.field("filename") || {}).value || '');
      } else {
        this.unset();
      }
    }
  },
  src: {
    type: String,
    label: "Image URL",
    autoValue() {
      if (this.isInsert) {
        const s3key = encodeURIComponent((this.field('s3key') || {}).value);
        return `https://roundtree-images.s3.amazonaws.com/${s3key}`;
      } else {
        this.unset();
      }
    }
  },
  thumbnail: {
    type: String,
    label: "Thumbnail image URL",
    defaultValue: "/img/gallery-thumbnail-icon.png"
  },
  thumbnailWidth: {
    type: Number,
    defaultValue: 100
  },
  thumbnailHeight: {
    type: Number,
    defaultValue: 100
  },
  caption: {
    type: String,
    defaultValue: ""
  },
  galleryId: {
    type: String
  }
});

Images.attachSchema(schema);
