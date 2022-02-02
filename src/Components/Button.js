import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  
  render() {
    const { name, onClick, label, disabled } =   this.props;
    return (
      <button type="submit" {...this.props}>
        {label}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}