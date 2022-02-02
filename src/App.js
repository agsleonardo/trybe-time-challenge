import React, { Component } from 'react';
import './App.css';
import Counter from './Components/Counter';
import Button from './Components/Button';
import Radio from './Components/Radio';

export default class App extends Component {
  
  state = {
    hour:0,
    min: 0,
    sec: 0,
    toChange:'',
    disabled: true,
  }

  refreshCount = (button, value) => {
    return button === 'addCounter' ? value + 1 : value - 1 
  }

  handleClick =  ({ target: { name } }) => {
    this.setState(({ toChange }) => {
      const newValue = this.refreshCount(name, this.state[toChange])
      return { [toChange]: newValue < 0 ? 0 : newValue }
    })
  }

  handleChange = ( { target: { value } } ) => {
    this.setState({
      toChange: value,
      disabled: false
    })
  }

  render() {
    return (
      <>
      <Counter { ...this.state }/>
      <Radio onChange={this.handleChange}/>
      <Button name="addCounter" onClick={this.handleClick} label="+" disabled={this.state.disabled} />
      <Button name="subCounter" onClick={this.handleClick} label="-" disabled={this.state.disabled} />
      </>
    );
  }
}
