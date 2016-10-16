import { Meteor } from 'meteor/meteor';

require('/imports/startup/server/publications.js');
require('/imports/startup/server/aws.js');

Meteor.startup(() => {
  // code to run on server at startup
});
