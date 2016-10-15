import React, { Component } from 'react';

import AppBar from '../components/AppBar.jsx';

import RoundTreeTheme from '../material-ui-themes/RoundTreeTheme.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// App component - represents the whole app
export default class App extends Component {
  render() {
    const {
      // user,
      connected,
      children,
      location,
    } = this.props;

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(RoundTreeTheme)}>
        <div className="container">
          <AppBar title="Round Tree #1" />

          <div className="content">
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={200}
            >
              {clonedChildren}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
