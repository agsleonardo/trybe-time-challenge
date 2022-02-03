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
    restart:0,
  }

  interval = null;
  timeout = null;

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
    this.setState({restart: timeInMiliseconds})
    return timeInMiliseconds;
  }

  updateTimer = () => this.setState(({ hour, min, sec}) => ({
      hour: hour > 0 && min === 0 && sec === 0 ? hour - 1 : hour,
      min: min > 0 && sec === 0 ? min - 1 : min === 0 && sec === 0 && hour >= 1 ? 59 : min,
      sec: sec === 0 ? 59 : sec - 1
    }))

  startCounter = (totalTimer) => {
    this.interval = setInterval(this.updateTimer, 1000);
    this.timeOut = setTimeout(() => {
      clearInterval(this.interval);
      alert('Acabou o tempo!')
    }, totalTimer)
  }

  pauseTimer = () => {
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
  }

  restartTimer = () => {
    const { restart } = this.state;
    this.pauseTimer();
    const newHour = parseInt(restart / 3600000);
    const newMin = parseInt((restart / 60000)%60);
    const newSec = parseInt(((restart / 1000)%60)%1000);
    this.setState({
      hour: newHour,
      min: newMin,
      sec: newSec,  
    });
    this.startCounter(restart)
  }
  
  render() {

    return (
      <>
      <Counter { ...this.state }/>
      <Radio onChange={this.handleChange}/>
      <Button name="addCounter" onClick={this.handleClick} label="+" disabled={this.state.disabled} />
      <Button name="subCounter" onClick={this.handleClick} label="-" disabled={this.state.disabled} />
      <br />
      <Button name="start" onClick={() => this.startCounter(this.totalTimer())} label="Start" disabled={this.state.disabled} />
      <Button name="pause" onClick={this.pauseTimer} label="II" disabled={this.state.disabled} />
      <Button name="restart" onClick={this.restartTimer} label="Reiniciar" disabled={this.state.disabled} />
      </>
    );
  }
}
