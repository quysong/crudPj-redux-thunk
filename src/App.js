import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListEmployee from './components/ListEmployee/ListEmployee';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <>
      <ListEmployee></ListEmployee>
      </>
    );
  }
}

export default App;
