// Style imports
import 'normalize.css/normalize.css';

// Scripts
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(
    renderRoutes(),
    document.getElementById('render-target')
  );
});
