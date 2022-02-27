import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderTool from './Slider';

export default class Counter extends Component {
  
  render() {
    const { hour, min, sec, onChange } =   this.props;
    return (
      <>
        <div className='nContainer'>
          <p className="counter">{ hour <= 9 ? `0${hour}` : hour } </p>
            <SliderTool name="hour" onChange={onChange} />
        </div>
        <div className='nContainer'>
          <p>{ min <= 9 ? `0${min}` : min }</p>
            <SliderTool name="min" onChange={onChange} />
        </div>
        <div className='nContainer'>
          <p>{ sec <= 9 ? `0${sec}` : sec }</p>
            <SliderTool name="sec" onChange={onChange} />
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