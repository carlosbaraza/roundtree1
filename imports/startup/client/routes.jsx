import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      {/*<IndexRoute component={NotFoundPage}/>
      <Route path="*" component={NotFoundPage}/>*/}
      {/*<Route path="signin" component={AuthPageSignIn}/>
      <Route path="join" component={AuthPageJoin}/>*/}
    </Route>
  </Router>
);
