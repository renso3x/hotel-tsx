import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { Layout } from '../components/Layout';
import { IRootState } from '../reducers';
import { getRooms, Room } from '../actions/hotels';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid container spacing={2}>
            {children}
          </Grid>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

interface PageProps {
  rooms: Room[],
  getRooms: Function
}

const _SetupPage: React.FC<PageProps> = ({
  rooms,
  getRooms
}) => {

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getRooms();
  }, [])

  const formik = useFormik({
    initialValues: {
      roomNumber: '',
      roomFloor: 0,
      roomCount: 0,
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    }
  });

  const onEditRoom = (room: Room) => {
    console.log('room', room)
  }

  const renderRooms = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rooms.map((hotelRoom) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {hotelRoom.roomNumber}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton color="default" aria-label="delete-room" component="span" onClick={() => onEditRoom(hotelRoom)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="default" aria-label="delete-room" component="span">
                    <DeleteOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Layout>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Rooms" {...a11yProps(0)} />
          <Tab label="Room Plan" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid item xs>
            <div className={classes.margin}>
              <Typography variant="h6" gutterBottom>
                List of Rooms
              </Typography>

              {renderRooms()}

            </div>
          </Grid>

          <Grid item xs>
            <form
              onSubmit={formik.handleSubmit}
            >
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Typography variant="h6" gutterBottom>
                  Room Type
                </Typography>
              </FormControl>

              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="roomNumber">Room Number</InputLabel>
                <OutlinedInput
                  id="roomNumber"
                  label="Room Number"
                  value={formik.values.roomNumber}
                  onChange={formik.handleChange}
                  labelWidth={60}
                />
              </FormControl>

              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </FormControl>
            </form>
          </Grid>

        </TabPanel>
        <TabPanel value={value} index={1}>
          Room Rates
        </TabPanel>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: IRootState) => ({
  rooms: state.hotel.rooms,
})

export const SetupPage = connect(mapStateToProps, {
  getRooms
})(_SetupPage);