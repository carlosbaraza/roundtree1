import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import NewGalleryContainer from '../../ui/containers/galleries/NewGalleryContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={NewGalleryContainer}/>
      <Route path="*" component={NewGalleryContainer}/>
      {/*<Route path="signin" component={AuthPageSignIn}/>
      <Route path="join" component={AuthPageJoin}/>*/}
    </Route>
  </Router>
);
