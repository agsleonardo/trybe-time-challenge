import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class Radio extends Component {
  
  render() {
    const { onChange } =   this.props;
    return (
      <label htmlFor='radioTime'>
        <input type="radio" value="hour" name="radioTime" onChange={onChange}/> Hours
        <input type="radio" value="min" name="radioTime" onChange={onChange}/> Minutes
        <input type="radio" value="sec" name="radioTime" onChange={onChange}/> Seconds
      </label>
    )
  }
}

// Radio.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
// }