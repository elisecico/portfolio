/* ---------------- imports --------------------------------------------------------- */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from './view.jsx';

import {
  $,
  nav,
} from '../../modules';

/* ---------------- home container ----------------------------- */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        {...this.props}
      />
    );
  }
}

App.propTypes = {};

/* ---------------- props mapping ---------------------------------------------------- */

const mapStateToProps = (state) => {
  const stateNav = $.getNav(state);
  return {
    nav: nav.api.nav(stateNav),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
