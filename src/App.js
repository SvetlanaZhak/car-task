import React, { Component } from 'react';
import CarList from './components/CarList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>CarShop </h2>
        </header>
        <CarList>

        </CarList>
      </div>
    );
  }
}

export default App;
