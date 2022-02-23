import React, { Component } from 'react';
import './App.css';
import Counter from './Components/Counter';
import Button from './Components/Button';
import Radio from './Components/Radio';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import PauseIcon from '@mui/icons-material/Pause';

export default class App extends Component {
  
  state = {
    hour:0,
    min: 0,
    sec: 0,
    toChange:'',
    disabledStart: true,
    disabledPause: true,
    disabledRestart: true,
    restart:0,
    savedTimes: JSON.parse(localStorage.getItem('savedTimes')) || [],
    play: false,
    pause: true,
  }
//   radios = ['https://listen.christianhardrock.net/stream/3',
// 'https://uk7.internet-radio.com/proxy/movedahouse?mp=/stream']
  // url = this.radios[Math.floor(Math.random() * (1 - 0)) + 0];
  url = 'https://uk7.internet-radio.com/proxy/movedahouse?mp=/stream';
  audio = new Audio(this.url);
  play = () => {
    this.setState({ play: true, pause: false })
      this.audio.play();
    }
  
  pause = () => {
  this.setState({ play: false, pause: true })
    this.audio.pause();
  }    

  interval = null;
  timeout = null;

  refreshCount = (button, value, lastTime) => {
    return button === 'addCounter' ? lastTime + Number(value) : lastTime - Number(value) 
  }

  handleClick =  ({ target: { name, value } }) => {
    this.setState(({ toChange }) => {
      const newValue = this.refreshCount(name, value, this.state[toChange])
      return { [toChange]: newValue < 0 ? 0 : newValue }
    })
  }

  handleChange = ( { target: { value } } ) => {
    this.setState({
      toChange: value,
      disabledStart: false,
      disabledRestart: false
    })
  }

  totalTimer = () => {
    const { hour, min, sec, restart } = this.state
    const timeInMiliseconds = (hour*3600000)+(min*60000)+(sec*1000)
    this.setState({restart: restart === 0 ? timeInMiliseconds : restart})
    return timeInMiliseconds;
  }

  updateTimer = () => this.setState(({ hour, min, sec}) => ({
      hour: hour > 0 && min === 0 && sec === 0 ? hour - 1 : hour,
      min: min > 0 && sec === 0 ? min - 1 : min === 0 && sec === 0 && hour >= 1 ? 59 : min,
      sec: sec === 0 ? 59 : sec - 1
    }))

  startCounter = (totalTime) => {
    this.play();
    this.interval = setInterval(this.updateTimer, 1000);
    this.timeOut = setTimeout(() => {
      clearInterval(this.interval);
      alert('Acabou o tempo!')
      this.audio.pause();
    }, totalTime)
    this.setState({
      disabledPause: false,
      disabledStart: true,
    })
  }

  pauseTimer = () => {
    this.pause();
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
    this.setState({
      disabledPause: true,
      disabledStart: false,
    })
  }

  convertMiliseconds = (mili) => {
    const newHour = parseInt(mili / 3600000);
    const newMin = parseInt((mili / 60000)%60);
    const newSec = parseInt(((mili / 1000)%60)%1000);
    return {
      hour: newHour,
      min: newMin,
      sec: newSec,  
    }
  }

  restartTimer = (restart) => {
    this.play();
    this.pauseTimer();
    this.setState(this.convertMiliseconds(restart));
    this.startCounter(restart)
  }

  saveTime = () => {
    const totalTime = this.totalTimer();
    const eachTime = this.convertMiliseconds(totalTime)
    this.setState({
      savedTimes: [...this.state.savedTimes, {...eachTime ,totalTime}]
    }, () => localStorage.setItem('savedTimes', JSON.stringify(this.state.savedTimes)))
  }
  
  render() {
    const { savedTimes, restart } = this.state;
    return (
      <main className='main'>
        <section className='crono'>
          <section className='header'>
            TRYBE TIMER CHALLENGE
          </section>
          <section className='counter'>
          <Counter { ...this.state }/>
          </section>
          <section className='options'>
          <section>
            <Button className="adjust" name="subCounter" onClick={this.handleClick} label="-1" value="1" disabled={this.state.disabled} />
            <Button className="adjust" name="subCounter" onClick={this.handleClick} label="-3" value="3" disabled={this.state.disabled} />
            <Button className="adjust" name="subCounter" onClick={this.handleClick} label="-5" value="5" disabled={this.state.disabled} />
          </section>
          <Radio onChange={this.handleChange}/>
          <section>
            <Button className="adjust" name="addCounter" onClick={this.handleClick} label="+1" value="1" disabled={this.state.disabled} />
            <Button className="adjust" name="addCounter" onClick={this.handleClick} label="+3" value="3" disabled={this.state.disabled} />
            <Button className="adjust" name="addCounter" onClick={this.handleClick} label="+5" value="5" disabled={this.state.disabled} />
          </section>
          </section>
          <section className='buttons top'>
          <Button className="adjust set" name="start" onClick={() => this.startCounter(this.totalTimer())} label="Start" disabled={this.state.disabledStart} />
          </section>
          <section className='buttons'>
          <Button className="adjust set" name="pause" onClick={this.pauseTimer} label={<PauseIcon />} disabled={this.state.disabledPause} />
          <Button className="adjust set" name="restart" onClick={() => this.restartTimer(restart)} label={<ThreeSixtyIcon />} disabled={this.state.restart === 0} />
          <Button className="adjust set" name="saveTime" onClick={this.saveTime} label="Salvar tempo" disabled={this.state.disabledStart} />
          </section>
          <section className='saved-time'>
            {
              savedTimes.map(({ hour, min, sec, totalTime }, idx) => (
                <Button
                  key={idx}
                  className="adjust set"
                  name="start"
                  onClick={() => this.restartTimer(totalTime)}
                  label={`${hour <= 9 ? `0${hour}` : hour}:${min <= 9 ? `0${min}` : min}:${sec <= 9 ? `0${sec}` : sec}`} />
              ))
            }
          </section>
        </section>
      </main>
    );
  }
}
