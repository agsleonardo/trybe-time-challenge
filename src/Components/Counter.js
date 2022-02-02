import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
  
  render() {
    const { hour, min, sec } =   this.props;
    return (
      <p>{ hour <= 9 ? `0${hour}` : hour }
      : { min <= 9 ? `0${min}` : min } 
      : { sec <= 9 ? `0${sec}` : sec }</p>
    )
  }
}

Counter.propTypes = {
  hour: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
}