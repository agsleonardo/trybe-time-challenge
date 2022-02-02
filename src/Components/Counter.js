import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
  
  render() {
    const { hour, min, sec } =   this.props;
    return (
      <p>{ hour } { min } { sec }</p>
    )
  }
}

Counter.propTypes = {
  hour: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  sec: PropTypes.string.isRequired,
}