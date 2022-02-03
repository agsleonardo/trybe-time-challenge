import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class Radio extends Component {
  
  render() {
    const { onChange } =   this.props;
    return (
      <>
        <input type="radio" value="hour" name="radioTime" onChange={onChange}/> Hours
        <input type="radio" value="min" name="radioTime" onChange={onChange}/> Minutes
        <input type="radio" value="sec" name="radioTime" onChange={onChange}/> Seconds
      </>
    )
  }
}
