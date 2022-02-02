import React, { Component } from 'react';
import './App.css';
import Counter from './Components/Counter';

export default class App extends Component {
  
  state = {
    hour:'00',
    min: '00',
    sec: '00'
  }

  render() {
    return (
      <>
      <Counter { ...this.state }/>
      </>
    );
  }
}
