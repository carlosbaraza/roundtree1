import {
  greenA400, greenA700,
  grey100, grey300, grey400, grey500, grey900
} from 'material-ui/styles/colors';

import React, { Component, PropTypes } from 'react';
import UIAppBar from 'material-ui/AppBar';

export default class AppBar extends Component {
  render() {
    const title = this.props.title;
    return (
      <UIAppBar
        style={{
          backgroundColor: grey900
        }}
        title={
          <div>
            <span>{title}</span>
          </div>
        }
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

AppBar.propTypes = {
  title: PropTypes.string,
};
