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

  totalTimer = () => {
    const { hour, min, sec } = this.state
    const timeInMiliseconds = (hour*3600000)+(min*60000)+(sec*1000)
    return timeInMiliseconds;
  }

  updateTimer = () => this.setState(({ hour, min, sec}) => ({
      hour: hour > 0 && min === 0 && sec === 0 ? hour - 1 : hour,
      min: min > 0 && sec === 0 ? min - 1 : min === 0 && sec === 0 && hour >= 1 ? 59 : min,
      sec: sec === 0 ? 59 : sec - 1
    }))

  startCounter = () => {
    const timeInMiliseconds = this.totalTimer();
    const interval = setInterval(this.updateTimer, 1000);
    setTimeout(() => clearInterval(interval), timeInMiliseconds)
  }
  
  render() {

    return (
      <>
      <Counter { ...this.state }/>
      <Radio onChange={this.handleChange}/>
      <Button name="addCounter" onClick={this.handleClick} label="+" disabled={this.state.disabled} />
      <Button name="subCounter" onClick={this.handleClick} label="-" disabled={this.state.disabled} />
      <br />
      <Button name="start" onClick={this.startCounter} label="Start" disabled={this.state.disabled} />
      </>
    );
  }
}
