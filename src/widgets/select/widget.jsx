import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelected.label,
      isDropdownOpen: false,
    };
  }
  componentDidMount() {
    this.props.onSelectChange(this.state.selected);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }
  handleSelect(e, option) {
    e.preventDefault();
    this.setState({
      isDropdownOpen: false,
      selected: option.label,
    });
    this.props.onSelectChange(option.value);
  }
  render() {
    return (
      <div className="select">
        <div
          className="t-input select__input"
          role="button"
          placeholder=""
          onClick={e => this.handleClick(e)}
        >
          {this.state.selected}
        </div>
        {
          this.state.isDropdownOpen &&
          <div>
            <div
              role="button"
              className="cancel-wrapper"
              onClick={e => this.handleClick(e)}
            />
            <div className="options-wrapper">
              {this.props.options.map((option) => {
                return (
                  <div
                    className="t-input option"
                    role="button"
                    key={option.value}
                    onClick={e => this.handleSelect(e, option)}
                  >{option.label}</div>
                );
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  defaultSelected: PropTypes.object.isRequired,
};
