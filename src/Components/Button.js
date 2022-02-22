import React, { Component } from 'react';

export default class Button extends Component {
  
  render() {
    const { label } =   this.props;
    return (
      <button type="submit" {...this.props}>
        {label}
      </button>
    )
  }
}