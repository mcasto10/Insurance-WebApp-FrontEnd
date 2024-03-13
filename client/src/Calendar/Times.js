import React from 'react';
import { useState } from 'react';
import './CalenderQuote.css';
import DateToggleToken from './DateToggleToken.js'; 
import './DateToggleToken.css';

const officeTime = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; 


// Function to convert a time string (hh:mm AM/PM) to minutes
function timeStringToMinutes(timeString) {
  const [hhmm, ampm] = timeString.split(' ');
  const [hh, mm] = hhmm.split(':');
  let minutes = parseInt(hh) * 60 + parseInt(mm);

  // Adjust for PM times (add 12 hours worth of minutes)
  if (ampm === 'PM') {
    minutes += 12 * 60;
  }

  return minutes;
}

function Times(props) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Selection of times on Appointment
  const handleTimeSelect = (time) => {
    if (props.selectedTime === time) {
        props.onTimeSelect(null);
    } else {
        props.onTimeSelect(time);
    }
  };
  

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }

  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [timeSectionIndex, setTimeSectionIndex] = useState(0);

  const handleNext = () => {
    setTimeSectionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setTimeSectionIndex((prevIndex) => prevIndex - 1);
  };
  
  const isToday = props.date.toDateString() === currentTime.toDateString();

  // Filter officeTime to include only future times for today
  const filteredOfficeTime = isToday
    ? officeTime.filter((time) => {
        const timeInMinutes = timeStringToMinutes(time);
        return currentTimeInMinutes < timeInMinutes;
      })
    : officeTime;

  return (
    <div className="times">
      <div className="time-section">
        {filteredOfficeTime.map((time, index) => {
          const [hour, minute] = time.split(':');
          const timeInMinutes = timeStringToMinutes(time);

          return (
            // ToggleToken 
            <div key={index}>
              <DateToggleToken
                key={index}
                time={time}
                day={props.date.toDateString()}
                selectedTime={props.selectedTime}
                onTimeSelect={handleTimeSelect}
              />
            </div>
          );
        })}
      </div>
      {info ? `Your appointment is set to ${event} ${props.date.toDateString()}` : null}
    </div>
  );
}


export default Times;
