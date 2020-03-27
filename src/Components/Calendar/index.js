import React from 'react';
import moment from 'moment';
import { range } from 'moment-range';
import './calendar.scss';
import DateForm from '../DateForm/DateForm';
import '../DateForm/DateForm.scss';

export default class Calendar extends React.Component {

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: !false,
      showYearNav: true,
      startDate: null,
      endDate: null,
      isStartSet: false,
      isEndSet: false,
      dates: []
    };
  }

  year = () => {
    return this.state.dateContext.format('Y');
  }
  month = () => {
    return this.state.dateContext.format('MMMM');
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
  currentDate = () => {
    return this.state.dateContext.get('date');
  }
  currentDay = () => {
    return this.state.dateContext.format('D');
  }

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set('month', monthNo);
    this.setState({
      dateContext: dateContext
    });
  }

  prevMonth = () =>  {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  }

  nextMonth = () =>  {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext
    });
    this.props.onNextMonth && this.props.onNextMonth();
  }

  onSelectChange = (e, data) => {
    this.setMonth(data);
    this.props.onChangeMonth && this.props.onChangeMonth();
  }

  forDatesInRange = (startDate, endDate) => {
    var dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('DD/MM/YYYY'));
      currentDate = moment(currentDate).add(1, 'day');
    }
    return dateArray;
  }

  setDates = (d) => {
    let betweenDates
    if (this.state.isStartSet == false) {
      this.setState({ 
        startDate: d + ' ' + this.month() + ' ' + this.year(), 
        isStartSet: !this.state.isStartSet
      })
    } else if (this.state.isStartSet == true && this.state.isEndSet == false) {
      this.setState({ 
        endDate: d + ' ' + this.month() + ' ' + this.year(),
        dates: this.forDatesInRange(this.state.startDate, d + ' ' + this.month() + ' ' + this.year()),
        isEndSet: !this.state.isEndSet
      })
    } else if (this.state.isStartSet == true && this.state.isEndSet == true) {
      this.setState({ 
        isStartSet: false, 
        isEndSet: false, 
        startDate: null, 
        endDate: null,
        dates: []
       })
    };
      this.setState(
    {
     
    },
    () => {
      betweenDates = this.forDatesInRange(this.state.startDate, this.state.endDate);
      console.log("SELECTED DAY: ", this.state.startDate, this.state.endDate, this.state.dates, betweenDates);
    }
    );
  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a href='#' onClick={(e)=>{this.onSelectChange(e,data)}}>
            {data}
          </a>
        </div>
      );
    });

    return (
      <div className='month-popup'>
        {popup}
      </div>
    );
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    });
  }

  currentMonth = () => {
    return (
      <span className='label-month'>
        {this.month()}
      </span>
    );
  }

  MonthNav = () => {
    return (
      <span className='label-month'
        onClick={(e)=>{this.onChangeMonth(e, this.month())}}>
        {this.month()}
        {this.state.showMonthPopup &&
          <this.SelectList data={this.months} />
        }
      </span>
    );
  }

  showYearEditor = () => {
    this.setState({
      showYearNav: true
    });
  }

  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    this.setState({
      dateContext: dateContext
    });
  }

  onChangeYear = (e) => {
    this.setYear(e.target.value);
    this.props.onChangeYear && this.props.onChangeYear(e, e.target.value)
  }

  onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value);
      this.setState({
        showYearNav: true
      });
    }
  }

  YearNav = () => {
    return (
      this.state.showYearNav ? 
      <input 
      value= {this.year()} 
      className="editor-year" 
      ref={(yearInput) => this.yearInput = yearInput}
      onKeyUp = {(e) => this.onKeyUpYear(e)}
      onChange = {(e) => this.onChangeYear(e)}
      type="number"/> :
      <span className='label-year' onDoubleClick={(e)=> {this.showYearEditor()}}>
        {this.year()}
      </span>
    );
  }

  render() {

    let startText = this.state.startDate === null ? 'MM/DD/YYYY' : this.state.startDate;
    let endText= this.state.endDate === null ? 'MM/DD/YYYY' : this.state.endDate;
    let currentYear = this.year()

    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className='week-day'>{day}</td>
      )
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={i*80} className='emptySlot'>
        {''}
      </td>
      );
    }

    let daysInMonth = [];
    for(let d=1; d <= this.daysInMonth(); d++) {
      let selectedDate = (this.state.dates.includes(moment(d + this.month() + this.year()).format('DD/MM/YYYY')) ? "start-date" : "")
      daysInMonth.push(
        <td key={d} className={`day ${selectedDate}`} onClick={() => {this.setDates(d)}}>
          <span>{d}</span>
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    rows.shift();

    let trElements = rows.map((d, i) => {
      return(
        <tr key={i*100}>
          {d}
        </tr>
      );
    });

    return (
      <div className="calendar-container">
        <table className='calendar'>
          <thead>
            <tr className='calendar-header'>
              <td colSpan="1" className="nav-month">
                <i className="prev fa fa-fw fa-chevron-left" onClick={(e) => {this.prevMonth()}}></i>
              </td>
              <td colSpan='5'>
                <this.currentMonth />
                {" "}
                <this.YearNav placeholder={currentYear} />
              </td>
              <td colSpan="1" className="nav-month">
                <i className="prev fa fa-fw fa-chevron-right" onClick={(e) => {this.nextMonth()}}></i>
              </td>
            </tr>
          </thead>
          <tbody className='calendar-body'>
            <tr>
              {weekdays}
            </tr>
              {trElements}
          </tbody>
        </table>
        <DateForm startText = {startText} endText={endText}/>
      </div>
    );
  }
}