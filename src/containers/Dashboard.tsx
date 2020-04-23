import React from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export class Dashboard extends React.Component {
  state = {
    selectedDay: new Date(),
    days: [],
    daysInMonth: [],
    week: [],
    rooms: _.times(10, (n: number) =>  {
      return {
        name: `Room ${n}`,
      }
    })
  }

  componentDidMount() {
    this.generateWeek();
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
      week: _.times(7, (n: number) =>  {
        return moment(this.state.selectedDay, "DD-MM-YYYY").add(n, 'days').format('dd D')}
      )
    })
  }

  renderBookings = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rooms</TableCell>
              {this.state.week.map((w: Date) => (
                <TableCell key={uuidv4()}>
                  <Typography variant="subtitle1">
                    {w}
                    </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rooms.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1">
                    {row.name}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  render() {
    return (
      <Container fixed>
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
      </Container>
    )
  }
}
