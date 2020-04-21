import React from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import _ from 'lodash';

export class Dashboard extends React.Component {
  state = {
    selectedDay: new Date(),
    days: [],
    daysInMonth: []
  }

  handleDayClick = (day: Date) => {
    this.setState({
      selectedDay: day,
    });
  }

  renderDates() {
    return (
      <ul>
        {
          _.times(14, (n: number) =>  {
            return(
              <li style={{ display: 'inline', margin: 5 }} key={n}>{moment(this.state.selectedDay, "DD-MM-YYYY").add(n, 'days').format('dd D - MMM')}</li>
            )
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h1>Welcome to Dashboard</h1>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />

        <p>
          {this.state.selectedDay
            ? this.state.selectedDay.toLocaleDateString()
            : 'Please select a day 👻'}
        </p>

        {this.renderDates()}
      </div>
    )
  }
}
