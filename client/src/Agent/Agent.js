import haversineCalculation from './Haversine-Formula.js';
import './Agent.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import OfficeBuilidng from '../assets/OfficeBuilding.png';
import HomeBuilding from '../assets/HomeBuilding.png'


import { icon } from 'leaflet';

const officeIcon = icon({
  iconUrl: OfficeBuilidng,
  iconSize: [30, 30],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const homeIcon = icon({
  iconUrl: HomeBuilding,
  iconSize: [30, 30],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Array of objects of the office locations

const Agent = () => {

  const [error, setError] = useState("");

  const [insuranceAddress, setInsuranceAddress] = useState([
    // 33.8969, -118.1632
    { name: 'Paramount Aris Insurance Service', location: '7922 Rosecrans Ave Ste E, Paramount, CA 90723', phoneNumber: '(562) 616-0070' },
    // 33.797, -118.2991
    { name: 'Harbor City Aris Insurance Service', location: '1212 Pacific Coast Hwy, Harbor City, CA 90710', phoneNumber: '(310) 326-4771' },
    // 33.75418098357155, -118.29159332329063
    { name: 'San Pedro Aris Insurance Service', location: '639 W Channel St, San Pedro, CA 90731', phoneNumber: '(131) 025-64748' }
  ]);

  /* const [hasValue, setHasValue] = useState(false);
   inputValue: holds the current value
   setInputValue: holds the newly submitted value */
  const [inputValue, setInputValue] = useState("");
  const [zipCodeEntered, setZipCodeEntered] = useState("");
  const [latitudeEntered, setlatitudeEntered] = useState("");
  const [longitudeEntered, setlongitudeEntered] = useState("");


  // Current Day Tupple
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [currentDayHours, setCurrentDayHours] = useState([]);
  const [allDaysHours, setAllDaysHours] = useState([]);


  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const openingHours = [
    { day: 'Sunday', hours: 'Closed' },
    { day: 'Monday', hours: '9 AM–7 PM' },
    { day: 'Tuesday', hours: '9 AM–7 PM' },
    { day: 'Wednesday', hours: '9 AM–7 PM' },
    { day: 'Thursday', hours: '9 AM–7 PM' },
    { day: 'Friday', hours: '9 AM–7 PM' },
    { day: 'Saturday', hours: '9 AM–3 PM' },
  ];

  const toggleDropdown = (index) => {
    setSelectedRowIndex(selectedRowIndex === index ? null : index);
  };

  const closeDropdown = (event) => {
    if (event.target.id !== 'dropdown') {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    const currentDayName = daysOfWeek[currentDay];

    // Filter the opening hours for the current day
    const filteredCurrentDayHours = openingHours.filter((hour) => hour.day === currentDayName);
    setCurrentDayHours(filteredCurrentDayHours);

    // Filter the opening hours for all days except the current day
    const filteredAllDaysHours = openingHours.filter((hour) => hour.day !== currentDayName);
    setAllDaysHours(filteredAllDaysHours);
  }, []);


  // Current Day Tupple End


 

  const haversineDistance = () => {
    // let ParamountDistance = haversineCalculation(33.8969, -118.1632, inputValue.PostalLatitude, inputValue.PostalLongitude);
    // let HarborDistance = haversineCalculation(33.797, -118.2991, inputValue.PostalLatitude, inputValue.PostalLongitude);
    // let SanPedroDistance = haversineCalculation(33.75418098357155, -118.29159332329063, inputValue.PostalLatitude, inputValue.PostalLongitude);
    let ParamountDistance = haversineCalculation(33.8969, -118.1632, latitudeEntered,longitudeEntered);
    let HarborDistance = haversineCalculation(33.797, -118.2991, latitudeEntered,longitudeEntered);
    let SanPedroDistance = haversineCalculation(33.75418098357155, -118.29159332329063, latitudeEntered,longitudeEntered);


    const updatedInsuranceAddress = insuranceAddress.map(item => {
      if (item.name === "Paramount Aris Insurance Service") {
        return { ...item, distance: ParamountDistance };
      }

      if (item.name === "Harbor City Aris Insurance Service") {
        return { ...item, distance: HarborDistance };
      }

      if (item.name === "San Pedro Aris Insurance Service") {
        return { ...item, distance: SanPedroDistance };
      }

      return item;
    });

    const sortedArray = updatedInsuranceAddress.sort((a, b) => a.distance - b.distance);
   
    setInsuranceAddress(sortedArray);
  };


   /* This isn't working, should be updating the location as it goes. 
  Also should zoom out if the distance is at a specific unit */
  const [latitudeDefault, setLatitudeDefault] = useState(33.9693);
  const [longitudeDefault, setLongitudeDefault] = useState(-118.0337);

  useEffect(() => {
    if (longitudeEntered && latitudeEntered) {
      haversineDistance();
    }
  }, [longitudeEntered, latitudeEntered]);
  
  
  // handle the user input as there entering the ZipCode
  const handleChange = (event) => {
    const newValue = event.target.value.slice(0, 5);
    setInputValue(newValue);
  };

  // handle the user input once they entered the ZipCode
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`https://insurance-webapp-backend.onrender.com/apiController/zipcode/${inputValue}`);
      const ZipCodeInfo = response.data;
    

      setZipCodeEntered(inputValue);
      setlongitudeEntered(ZipCodeInfo.PostalLongitude);
      setlatitudeEntered(ZipCodeInfo.PostalLatitude);

    } catch (error) {
      console.log(error);
      setError(error.message);
    };
  };



  return (
    <div className='agent-spacing'>

      <h1 style={{ fontSize: '45px', display: 'flex', alignItems: 'center', color: '#3f5978', justifyContent: 'center' }}>Discover the closest insurance office to you  </h1>
      <div className='agentLine'> </div>

      <div className='content-container'>
        <div className='left-content'>
        {error && (
          <div className="error-message" style={{ color: 'red' }}>
            {error}
          </div>
        )}
        
          <p className = "zipCodeHeader" > Enter your Zipcode: </p>
          <form onSubmit={handleSubmit}>
            <div className="md-textbox">
              <input
                value={inputValue}
                onChange={handleChange}
                maxLength={5}
                id="input"
                type="text"
                className={inputValue ? 'has-value' : ''}
              />
              <label htmlFor="input"> ZipCode </label>
              <button type="submit" style={{
                margin: '10px',
                backgroundColor: '#3f5978',
                color: '#ffffff',
                height: '45px',
                fontSize: '12px',  // Set the initial font size
                transition: 'background-color 0.3s, color 0.3s, font-size 0.3s',  // Add transition for a smooth effect
                cursor: 'pointer',
              }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2a3b4e'}  // Change background color on hover
                onMouseOut={(e) => e.target.style.backgroundColor = '#3f5978'}   // Change background color back on mouse out
              > Submit</button>
            </div>
          </form>

          {/* Table starts here */}
          <table class="nice-table">
            <thead>
              <tr>
                <th> Office location nearest to you </th>
              </tr>
            </thead>
            <tbody>
              {insuranceAddress.map((obj, index) => (
                <tr key={index}>
                  <td>
                    <div className='table-info-container'>
                      <div className='left-table-column'>
                        <div className="container-table">
                          <div className="red-box">{index + 1}</div>
                          <div style={{ fontSize: '18px' }}> Office Location: </div>
                        </div>
                        <div>

                          {obj.name}
                          {/* {obj.location} */}
                        </div>
                      </div>

                      <div className='right-table-column'>
                        <p> Phone: {obj.phoneNumber}</p>
                        <p> Address: {obj.location}</p>


                        <div style={{ position: 'relative', display: 'inline-block' }}>

                          <div> Hour:
                            <div
                              style={{
                                cursor: 'pointer',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                              }}
                              onClick={() => toggleDropdown(index)}
                            >
                              {selectedRowIndex === index && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1,
                                    backgroundColor: '#fff',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    marginTop: '4px',
                                  }}
                                >
                                  {/* Render the hours for the selected row */}
                                  {allDaysHours.map((hour, index) => (
                                    <p key={index}>
                                      {hour.day}: {hour.hours}
                                    </p>
                                  ))}
                                </div>
                              )}

                              {currentDayHours.map((hour, index) => (
                                <p key={index}>
                                  {hour.day}: {hour.hours}
                                </p>
                              ))}
                            </div>

                            {isDropdownVisible && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: 0,
                                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                  zIndex: 1,
                                  backgroundColor: '#fff',
                                  borderRadius: '4px',
                                  padding: '8px',
                                  marginTop: '4px',
                                }}
                                id="dropdown"
                                onClick={closeDropdown}
                              >

                                {allDaysHours.map((hour, index) => (
                                  <p key={index}>
                                    {hour.day}: {hour.hours}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>


                    <Link to={`/Agent/Calender?name=${obj.name}&location=${obj.location}`}>
                      <button className='button-container'> Make appointment </button>
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div className='agentRight-content'>

          {/* Page needs to be refreshed in order to be able to have the new wide image of the map */}
          <MapContainer center={[latitudeDefault, longitudeDefault]} zoom={10} style={{ height: '850px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />
            <Marker position={[33.8969, -118.1632]} icon={officeIcon}>
              <Popup>
                Paramount Aris Insurance Service. <br /> 7922 Rosecrans Ave Ste E, Paramount, CA 90723
              </Popup>
            </Marker>
            <Marker position={[33.797, -118.2991]} icon={officeIcon}>
              <Popup>
                Harbor City Aris Insurance Service. <br /> 1212 Pacific Coast Hwy, Harbor City, CA 90710
              </Popup>
            </Marker>

            <Marker position={[33.75418098357155, -118.29159332329063]} icon={officeIcon}>
              <Popup>
                San Pedro Aris Insurance Service. <br /> 639 W Channel St, San Pedro, CA 90731
              </Popup>
            </Marker>

            {latitudeEntered && longitudeEntered &&
              <Marker position={[latitudeEntered, longitudeEntered]} icon={homeIcon} >
                <Popup>
                  Your Location <br /> ZipCode {zipCodeEntered}
                </Popup>
              </Marker>
            }
          </MapContainer>
          {/* Testing user input for longitude and latitude: <p> {latitudeEntered}, {longitudeEntered}</p> */}
        </div>

      </div>

      <div className='line'> </div>

    </div>
  );
};

export default Agent;