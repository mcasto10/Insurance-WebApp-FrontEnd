import React from 'react';

export default function DateToggleToken({
  time,
  selectedTime,
  onTimeSelect,
}) {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour);

  // Determine whether it's AM or PM
  const amPm = hourInt >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  const hour12 = hourInt > 12 ? hourInt - 12 : hourInt;
  if (hour12 === 0) {
    hour12 = 12; // 12:00 AM in 12-hour format
  }

  const isSelected = selectedTime === time;

  const handleClick = () => {
    onTimeSelect(time);
  };

  return (
    <div
      className={`time-toggle-token ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {`${hour12}:${minute} ${amPm}`}
    </div>
  );
}
