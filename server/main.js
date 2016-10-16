import { Meteor } from 'meteor/meteor';

require('/imports/startup/server/collections.js');
require('/imports/startup/server/aws.js');
require('/imports/startup/server/methods.js');

Meteor.startup(() => {
  // code to run on server at startup
});
