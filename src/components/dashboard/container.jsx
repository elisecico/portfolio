/* ---------------- imports --------------------------------------------------------- */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from './view.jsx';

/* ---------------- home container ----------------------------- */

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View />
    );
  }
}

Dashboard.propTypes = {};

/* ---------------- props mapping ---------------------------------------------------- */

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
