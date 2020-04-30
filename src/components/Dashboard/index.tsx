import axios from 'axios';
import React from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import { API_URL } from '../../config';
import { getToken } from '../../actions/login';

interface Room {
  id: number;
  roomNumber: string;
}

interface IHotelRoomTypeRate {
  hotelroomId?: number;
}

interface Booking {
  bookingFrom: string;
  bookingTo: string;
  guest: string;
  guestId: number;
  hotelId: number;
  id: number;
  roomTypeRateId: number;
  hotelroomtyperate?: IHotelRoomTypeRate;
}

export class Dashboard extends React.Component {
  state = {
    selectedDay: new Date(),
    days: [],
    daysInMonth: [],
    week: [],
    rooms: [],
    bookings: []
  }

  componentDidMount() {
    this.generateWeek();
    this.fetchHotelRooms();
  }

  fetchHotelRooms = async () => {
    try {
      const url = `${API_URL['dev'].url}/hotels/rooms?hotel=1`;
      const response = await axios.get<{ hotelrooms: Room[] }>(url, {
        headers: {
          Authorization: getToken
        }
      });
      this.setState({
        rooms: response.data.hotelrooms
      })
    } catch (e) {
      console.error('Error', e);
    }
  }

  fetchBookings = async () => {
    try {
      const startDate = moment(this.state.selectedDay).format('YYYY-MM-DD');
      const endDate = moment(this.state.selectedDay).add(14, 'days').format('YYYY-MM-DD');

      const url = `${API_URL['dev'].url}/hotels/bookings?hotel=1&startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get<{bookings: Booking[]}>(url, {
        headers: {
          Authorization: getToken
        }
      });

      this.setState({
        bookings: response.data.bookings || []
      })
    } catch (e) {
      console.error('Error', e);
    }
  }

  handleDayClick = (day: Date) => {
    this.setState({
      selectedDay: day,
    }, () => {
      this.generateWeek();
    });
  }

  generateWeek = (): void => {
    this.setState({
      week: _.times(14, (n: number) =>  {
        return moment(this.state.selectedDay).add(n, 'days')}
      )
    }, () => {
      this.fetchBookings();
    })
  }

  renderBookings = () => {
    const TCellStyle = styled(TableCell)`
      background-color: ${props => props.defaultChecked ? 'green' : 'grey'};
    `;

    const { bookings, week } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rooms</TableCell>
              {this.state.week.map((w: Date) => (
                <TableCell key={uuidv4()}>
                  <Typography variant="subtitle1">
                    {moment(w, "DD-MM-YYYY").format('dd D')}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rooms.map((room, index) => {
              const { roomNumber, id } = room;
              return (
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      {roomNumber}
                    </Typography>
                  </TableCell>
                  {_.times(14, (key: number) => {
                    const colDate = moment(week[key], 'YYYY-MM-DD');

                    const roomIndex = _.findIndex(bookings, (b: any) => {
                      const bookingFrom = moment(b.bookingFrom, 'YYYY-MM-DD');
                      const bookingTo = moment(b.bookingTo, 'YYYY-MM-DD');

                      if (!_.isEmpty(b.hotelroomtyperate)) {
                        return b.hotelroomtyperate.hotelroomId === id && colDate.isBetween(bookingFrom, bookingTo, 'day', '[]');
                      }
                    });

                    return (
                      <TCellStyle
                        key={uuidv4()}
                        component="th"
                        scope="row"
                        defaultChecked={roomIndex === 0 || false}
                      />
                    )
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs md={3}>
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
          />
        </Grid>
        <Grid item xs={9}>
          {this.renderBookings()}
        </Grid>
      </Grid>
    )
  }
}

