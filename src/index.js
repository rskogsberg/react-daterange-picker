import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './Components/Calendar';
import './Components/Calendar/calendar.scss'
import DateForm from './Components/DateForm/DateForm';
import './App.scss';

function App() {

  return (
    <div className='App'>
      <Calendar />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
