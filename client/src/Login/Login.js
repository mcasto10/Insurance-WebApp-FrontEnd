import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import axios from "axios";
import queryString from 'query-string';

import eventBus from '../EventBus.js';


function Login() {
  const [user, setUser] = useState({ name: "", email: "", accessToken: "", refreshToken: "" });
  const [isLoadingApp, setIsLoadingApp] = useState(true);


  const [fullName, setFullName] = useState("");
  const [Username, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userAppointment, setUserAppointment] = useState([]);

  const [userQoute] = useState([]);
  const [userMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const officeName = queryParams.officeName;
  const officeLocation = queryParams.officeLocation;
  const appointmentTime = queryParams.appointmentTime;
  const appointmentDate = queryParams.appointmentDate;
  const guestId = queryParams.guestId;
  const fromLoginType = queryParams.fromLoginType === 'true';
  const fromReviewLoginStatus = queryParams.fromReviewLoginStatus === 'true';
  const fromAccountSetUp = queryParams.fromAccountSetUp === 'true';

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const responseCheckAuth = await axios.get('https://insurance-webapp-backend.onrender.com/user/CheckAuthStatus', {
          withCredentials: true,
        });
        

        if (responseCheckAuth.status === 200) {
          const userData = responseCheckAuth.data;

          setUser(userData);
          setUserName(userData.user.userName);

          eventBus.emit('userLoggedIn');
          

          setLoading(true);

          try {
            const responseUser = await axios.get(`https://insurance-webapp-backend.onrender.com/user/GetUserInformation?userId=${responseCheckAuth.data.user.userId}`, {
              withCredentials: true,
            });

            // Check if the response data contains user information
            if (responseUser.data) {
              const { firstName, middleName, lastName } = responseUser.data.userInfo;

              setFullName(`${firstName} ${middleName} ${lastName}`.trim().replace(/\s+/g, ' '));

            }
          } catch (error) {
            console.log("Incorrect User authentication ${error)");
          }

          try {
            const responseUserAppointment = await axios.post('https://insurance-webapp-backend.onrender.com/user/checkUserAppointment', responseCheckAuth.data.user.userId, {
              withCredentials: true,
            });
          

            setUserAppointment(responseUserAppointment.data[0]);


          } catch (error) {
            console.error('Authentication status check failed:', error);
          } finally {
            // Set loading state to false regardless of success or failure
            setIsLoadingApp(false);
          }

          if (fromLoginType) {
            getUserInfo(responseCheckAuth.data.user.userId)
          }
        }
      } catch (error) {
        console.error('Authentication status check failed:', error);
      }
    };

    checkAuthStatus();
  }, [navigate]);
  // [navigate, fromLoginType]);
  //  This array is specifying that the effect should run whenever any of these dependencies change. 
  // [navigate, fromLoginType, user, officeName, officeLocation, date, selectedTimes]

  const handleLogin = async (details) => {
    try {
      const userData = {
        name: details.name,
        password: details.password,
      };

      const responseSignIn = await axios.post('https://insurance-webapp-backend.onrender.com/user/SignIn', userData, {
        withCredentials: true,
      });
      


      if (responseSignIn.status === 200) {
        const userInfo = responseSignIn.data.userName;
        setUser(userInfo);
        setUserName(userInfo);
        eventBus.emit('userLoggedIn');


        // Setting user and userinfo
        if (fromAccountSetUp) {
          try {
            await axios.post(`https://insurance-webapp-backend.onrender.com/user/combinedUserInfo`, { someUserId: responseSignIn.userId, someBaseUserId: guestId });
          
          } catch (error) {
            console.error(error);
          }
        }

        if (fromLoginType) {
          // navigate(`/Agent/Appointment/ConfirmationPage?name=${user.name}&phone=${user.phone}&officenName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&email=${user.email}&zipCode=${user.zipCode}&address=${user.address}&city=${user.city}&state=${user.state}&message=${user.message}&bestContact=${user.bestContact}&fromAccountSetUp=true`);
          // navigate(`/Agent/Appointment/ConfirmationPage?officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}`);
          getUserInfo(responseSignIn.data.userId)

        }

        if (fromReviewLoginStatus) {
          navigate(`/MakeReview?user=${user}`);
        }

        else {

          setLoading(true);


          try {
            const responseUserAppointment = await axios.post('https://insurance-webapp-backend.onrender.com/user/checkUserAppointment', responseSignIn.data.userId, {
              withCredentials: true,
            });
          


            setUserAppointment(responseUserAppointment.data[0]);


          } catch (error) {
            console.error('Authentication status check failed:', error);
          }
        }



      } else {
        if (responseSignIn.data && responseSignIn.data.message) {
          setError(responseSignIn.data.message);
        } else {
          setError('An error occurred during login');
        }
      }
    } catch (error) {

      if (error.response && error.response.status === 401) {
        setError(error.response.data.message);
      }

      else {
        setError('An unexpected error occurred during login ');
      }
    }
  };

  const getUserInfo = async (userId) => {
    try {
      const responseUser = await axios.get(`https://insurance-webapp-backend.onrender.com/user/GetUserInformation?userId=${userId}`, {
        withCredentials: true,
      });
    

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
              email
            }
          }
        } = responseUser;

        navigate(`/Agent/Appointment/ConfirmationPage?firstName=${firstName}&middleName=${middleName}&lastName=${lastName}&phone=${phone}&email=${email}&zipCode=${zipCode}&bestContact=${bestContact}&state=${state}&officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}`);
      } else {
        console.error('User data not found');
      }
    } catch (error) {
      console.error(`Error retrieving user information: ${error.message}`);
    }
  };




  const handleCancelAppointment = async () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel your appointment?");

    if (isConfirmed) {
      try {
        await axios.get(`https://insurance-webapp-backend.onrender.com/appointment/deleteAppointment`);
      } catch (error) {
        console.error(`Error retrieving user information: ${error.message}`);
      }
    }
  };

  // const handleRescheduleAppointment = () => {
  //   // Handle rescheduling logic
  //   console.log("Reschedule appointment");
  // };



  return (
    <div>
      {user.email !== "" ? (

        <div>
          <div className="header">
            <h1 style={{ fontSize: '50px', color: '#3F5978' }}>
              Welcome, <span>{Username}</span>
              <div className="line"></div>
            </h1>
          </div>

          <div className="content">
            <div className="left">
              <div className="upcoming-events-dashboard">
                <h1>Upcoming Events</h1>
                <div className="line"> </div>
                {isLoadingApp ? (
                  <p>Loading...</p>
                ) : userAppointment ? (
                  <div style={{ fontWeight: '300', fontSize: '18px' }}>
                    <h3 className="underlined">Appointment Information</h3>
                    <div>
                      <p>Office Name: {userAppointment.officeName}</p>
                      <p>Office Location: {userAppointment.officeLocation}</p>
                      <p>Appointment Date: {new Date(userAppointment.appointmentDate).toLocaleDateString()}</p>
                      <p>Appointment Time: {userAppointment.appointmentTime}</p>
                    </div>
                    <br />
                    <p>
                      <button style={{ backgroundColor: '#3F5978' }} onClick={handleCancelAppointment}>
                        Cancel Appointment
                      </button>{' '}
                      |{' '}
                      {/* <button style={{ backgroundColor: '#3F5978' }} onClick={handleRescheduleAppointment}>
                        Reschedule Appointment
                      </button> */}
                    </p>
                  </div>
                ) : (
                  <p>No Upcoming Appointment</p>
                )}
              </div>
            </div>

            <div className="right">
              <div className="quick-action-dashboard">
                <h1> Quick Actions </h1>
                <div className="line"> </div>
                <Link to="/Agent?fromLogin=true">
                  <div className="make-event">
                    Make a Appointment
                  </div>
                </Link>
                <Link to="/Quote?fromLogin=true">
                  <div className="make-event">
                    Make a Quote
                  </div>
                </Link>
                <Link to="/Review?fromLogin=true">
                  <div className="make-event">
                    See all Reviews
                  </div>
                </Link>
                <Link to={`/MakeReview?user=${fullName}`}>
                  <div className="make-event">
                    Make a Review
                  </div>
                </Link>
                <Link to="/ContactUsPage?fromLogin=true">
                  <div className="make-event">
                    Get in Touch
                  </div>
                </Link>
              </div>

            </div>
          </div>

          <div className="content2">
            <div className="left">
              <div className="upcoming-summary">
                <h1> Previous Quotes </h1>
                <div className="line"></div>

                {userQoute ? (
                  <div style={{ fontWeight: '300', fontSize: '18px' }}>
                    <h3 className="underlined"> Quote Information </h3>
                    <div>
                      Details
                    </div>

                  </div>
                ) : (
                  <p> No Quote </p>
                )}


              </div>
            </div>
          </div>

          <div className="content2">
            <div className="left">
              <div className="upcoming-summary">
                <h3 className="underlined"> Messages </h3>

                {userMessage ? (
                  <div style={{ fontWeight: '300', fontSize: '18px' }}>
                    <h3 className="underlined"> Quote Information </h3>
                    <div>
                      Message Info
                    </div>

                  </div>
                ) : (
                  <p> No Messages </p>
                )}
              </div>
            </div>
          </div>
        </div>

      ) : (
        <div className="center-container">
         
          <div>
            <LoginForm Login={handleLogin} error={error} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
