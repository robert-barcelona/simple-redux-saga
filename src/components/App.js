import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import {connect} from 'react-redux';


import {getEvents} from '../actions'
import InputForm from "./EventList"

class App extends React.Component {


  render() {

    return (
      <div className="App">
       <InputForm/>
      </div>
    );
  }

}

export default App
