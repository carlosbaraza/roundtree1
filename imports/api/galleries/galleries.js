import { Meteor } from 'meteor/meteor';

export const Galleries = new Meteor.Collection('galleries');

// Define the schema
const schema = new SimpleSchema({
  title: {
    type: String,
    label: "Gallery title",
    max: 200,
    optional: true
  }
});

Galleries.attachSchema(schema);
