import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderTool from './Slider';

export default class Counter extends Component {
  
  render() {
    const { hour, min, sec, onChange, pause } =   this.props;
    return (
      <>
        <div className='nContainer'>
          <p className="counter">{ hour <= 9 ? `0${hour}` : hour } </p>
            <SliderTool name="hour" onChange={onChange} pause={ pause }/>
        </div>
        <div className='nContainer'>
          <p>{ min <= 9 ? `0${min}` : min }</p>
            <SliderTool name="min" onChange={onChange} pause={ pause }/>
        </div>
        <div className='nContainer'>
          <p>{ sec <= 9 ? `0${sec}` : sec }</p>
            <SliderTool name="sec" onChange={onChange} pause={ pause }/>
        </div>
      </>
    )
  }
}

Counter.propTypes = {
  hour: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
}