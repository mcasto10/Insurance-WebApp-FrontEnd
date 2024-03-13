import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Time from "./Time.js";
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import './Calendar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";


export default function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({});
  const navigate = useNavigate();

  const handleTimeSelect = (selectedDate, selectedTime) => {
    // Create a new object to hold the updated selected times
    const updatedSelectedTimes = {};

    // Update the selected time for the current date
    updatedSelectedTimes[selectedDate.toDateString()] = selectedTime;

    // Set the new state
    setSelectedTimes(updatedSelectedTimes);

  };

  // Getting office location
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const officeName = queryParams.name;
  const officeLocation = queryParams.location;

  // const fromLogin = queryParams.fromLogin == 'true';



  // Get the current date
  const currentDate = new Date();
  // Set the maximum date to the last day of the current month
  const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const minDate = new Date(); // Set it to the current date

  // creating a list of the next three days
  const next3Days = [];
  for (let i = 0; i < 3; i++) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);
    next3Days.push(nextDate);
  }
  
  const handlePreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
  
    // Set time to the end of the day
    newDate.setHours(23, 59, 59, 999);
  
    if (newDate > minDate) {
      setDate(newDate);
    }
  };

// Handler for going to the next day
const handleNextDay = () => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);

  // Set time to the start of the day for maxDate
  const maxDateStartOfDay = new Date(maxDate);
  maxDateStartOfDay.setHours(24, 24, 24, 24);

  // Check if the new date is before or equal to the maximum date
  if (newDate < maxDateStartOfDay) {
    setDate(newDate);
  }
};


  const timeConvertion = (time) => {
    const [hoursStr, minutesStr] = time.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Determining AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Converting to 12-hour format
    const twelveHourHours = hours % 12 || 12; // If hours is 0, use 12

    // Formatting the result
    const twelveHourTime = `${twelveHourHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    return twelveHourTime;
  }

  const onClickPreviousState = () => {
    navigate(`/Agent`);

  }

  const onClickAuthStatus = async () => {

    const appointmentTime = timeConvertion(Object.values(selectedTimes)[0]);

    try {
      const response = await axios.get('http://localhost:3001/user/CheckAuthStatus', {
        withCredentials: true,
      });

      // Log the user ID sent back
      if (response.status === 200) {
        try {
          
          const responseUser = await axios.get(`http://localhost:3001/user/GetUserInformation?userId=${response.data.user.userId}`, {
            withCredentials: true,
          });

          // Check if the response data contains user information
          if (responseUser.data) {


          const {
            data: {
              userInfo: {
                firstName,
                middleName,
                lastName,
                phone, 
                state,
                zipCode,
                bestContact
              }
            }
          } = responseUser;
          


          const {
            data: {
              user: { 
              email,
              _id,
              }
            }
          } = responseUser;


            // Navigate or perform further actions with the user information
            navigate(`/Agent/Appointment/ConfirmationPage?firstName=${firstName}&middleName=${middleName}&lastName=${lastName}&phone=${phone}&email=${email}&zipCode=${zipCode}&bestContact=${bestContact}&state=${state}&officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${date.toDateString()}&appointmentTime=${appointmentTime}&userId=${_id}`);
          } else {
            // Handle the case where user data is not available or not found
            console.error('User data not found');
          }
        } catch (error) {
          console.error(`Error retrieving user information: ${error.message}`);

          // Handle specific error messages or statuses
          if (error.response) {
            console.error(`Unexpected status code: ${error.response.status}`);
          }
        }

      }

      else {
        // Handle other status codes if needed
        console.error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error while checking authentication status:', error);

      // Redirect to the guest sign-up page in case of an error
      navigate(`/Login-Type?officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${date.toDateString()}&appointmentTime=${appointmentTime}&routeFrom=LoginPage`);
    }
  };

  return (
    <div className='app-Calender'>
      <h1 style={{ textAlign: "center", fontSize: '55px',   color: 'rgb(63, 89, 120)' }}> Set Appoitnment </h1>
      <div className='container-appointment'>
        <div className='left-column-appointment'>
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowTime(true)}
            maxDate={maxDate}
            minDate={minDate}
          />
        </div>

        <div className='right-column-appointment'>
          <h1 style={{ color: '#3F5978', marginTop: '10%' }}> Office Location: </h1> 
          <p style={{ fontWeight: '300', fontSize: '18px' }}>
  {officeName} <br /> {officeLocation}
</p>
         
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <button className='prevArrowButtonCalender' onClick={handlePreviousDay}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {next3Days.map((date, index) => (
            <div key={index} style={{ marginRight: '20px' }}>
              <p>{date.toDateString()}</p>
              <Time
                date={date}
                selectedTime={selectedTimes[date.toDateString()]}
                onTimeSelect={(showTime) => handleTimeSelect(date, showTime)}
                showTime={showTime}
              />
            </div>
          ))}
        </div>

        <button className='nextArrowButtonCalender' onClick={handleNextDay}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div style={{ marginTop: '40px',  }}>

      <button className='Previous-Time-Button'  onClick={onClickPreviousState} style={{ marginRight: '25px' }}>Previous</button>
        <button className='Next-Time-Button' onClick={onClickAuthStatus}> Next </button>
      </div>
    </div>
  )
}