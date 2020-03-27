import React, { useState } from 'react';
import moment from 'moment';
import './DateForm.scss';
import Calendar from '../Calendar/index';

export default class DateForm extends React.Component {
  render () {
    return (
      <>
        <form>
          <div className="form-control">
            <label htmlFor="start-date">Start Date</label>
            <input type="text" value={this.props.startText} placeholder="MM/DD/YYYY" />
          </div>
          <div className="form-control">
            <label htmlFor="end-date">End Date</label>
            <input type="text" value={this.props.endText} placeholder="MM/DD/YYYY" />
          </div>
        </form>
      </>
    )
  }
}
