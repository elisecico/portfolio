/* ---------------- imports --------------------------------------------------------- */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from './view.jsx';

/* ---------------- home container ----------------------------- */

class Pokedex extends Component {
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

Pokedex.propTypes = {};

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
)(Pokedex);
