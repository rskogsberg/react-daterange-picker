import React from 'react';
import './App.scss';

import Calendar from './Components/Calendar/';
import Modal from './Components/Modal/index/';
import DateForm from './Components/DateForm/DateForm/';

import { GlobalProvider } from './Context/GlobalState';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar width='100%' />
        <DateForm />
      </div>
    )
  }
}

export default App;