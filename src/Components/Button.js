import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  
  render() {
    const { onClick } =   this.props;
    return (
      <button type="submit" {...this.props}/>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}