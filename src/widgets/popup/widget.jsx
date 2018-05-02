/* ---------------- imports --------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* ---------------- widget view --------------------------------------------------------- */

export default class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleCancelClick(e) {
    e.preventDefault();
    this.props.onCancel();
  }
  handleSubmitClick(e) {
    e.preventDefault();
    this.props.onSubmit();
  }
  render() {
    return (
      <div className="wrapper--overlay">
        <div
          className="wrapper--cancel"
          role="button"
          onClick={this.props.onCancel}
        />
        <div className="wrapper--popup popup">
          <div className="t-title popup__title">
            {this.props.title}
          </div>
          <form onSubmit={e => this.handleSubmitClick(e)}>
            {this.props.children}
            <div className="popup__button-wrapper">
              <button
                type="button"
                className="btn btn-flat"
                onClick={e => this.handleCancelClick(e)}
              >cancel</button>
              <button
                type="submit"
                className="btn btn-blue"
                disabled={this.props.isSubmitDisabled}
              >{this.props.buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  children: PropTypes.array,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
};

Widget.defaultProps = {
  children: [],
};
