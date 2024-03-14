import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import arisLogo from '../assets/ARINSLOGO.png';
import axios from "axios";
import ProfileImg from '../assets/Profile.png';
import menuBar from '../assets/MenuBar.png';
import eventBus from '../EventBus';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/CheckAuthStatus`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus(); // Call the function to check authentication status on mount

    const handleUserLoggedIn = () => {
      setIsLoggedIn(true);
    };

    const handleUserLoggedOut = () => {
      setIsLoggedIn(false);
    };

    eventBus.on('userLoggedIn', handleUserLoggedIn);
    eventBus.on('userLoggedOut', handleUserLoggedOut);

    return () => {
      eventBus.off('userLoggedIn', handleUserLoggedIn);
      eventBus.off('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/SignOut`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        eventBus.emit('userLoggedOut');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/Login');
      } else {
        setError('An error occurred during logout');
      }
    } catch (error) {
      setError('An unexpected error occurred during logout');
      console.error('Logout error:', error);
    }
  };

  const data = [
    { name: 'Quote' },
    { name: 'Agent' },
    { name: 'Review' },
    { name: 'Contact Us' },

  ];

  return (
    <div>
      <div className="navBar-Header "> </div>
      <div className="nav">

        <div className="leftSide">
          <Link to="/" className="logo">
            <img className='Logo' alt='LogoImg' src={arisLogo} />
          </Link>
          <div className="dropdown">
            <div className="dropbtn"> <div className='insuranceHeaderName'> Insurance </div>
              <div className='menuBar'> <img src={menuBar} alt='menuBarImg' /></div>
              <i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-content">
              <div className="header">
                <p> Insurance </p>
              </div>
              <div className="row">
                <div className="column">
                  <a href="/AutoPage"> Automobile Insurance </a>
                  <a href="/AutoRegistration"> Auto registration services </a>
                  <a href="/BoatPage"> Boat Insurance </a>
                  <a href="/BusinessPage"> Business Insurance  </a>
                </div>
                <div className="column">
                  <a href="/ClassicCarPage"> Classic Car Insurance </a>
                  <a href="/CommericalAutoPage"> Commerical Auto </a>
                  <a href="/HomeOwnersPage"> Homeowners Insurance </a>
                  <a href="/MotorCyclePage"> Motorcycle Insurance </a>


                </div>
                <div className="column">
                  <a href="/RvPage"> RV Insurance </a>
                </div>
              </div>
            </div>
          </div>

          <ul className='leftHeaderContent'>
            {data.map((key, idx) => (
              <CustomLink to={key.name === 'Contact Us' ? 'ContactUsPage' : key.name}>{key.name}</CustomLink>

            ))}
          </ul>
        </div>
        <div className="rightside">
          <ul>
            <ul>
              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <li>
                    <CustomLink to="/Login">
                      <img style={{ height: '30px', width: '30px' }} src={ProfileImg} alt='ProfileImg' />
                    </CustomLink>

                  </li>
                  <span style={{ margin: '0 5px' }}>|</span>

                  <CustomLink to="" onClick={handleLogout}>
                    Logout
                  </CustomLink>
                </div>

              ) : (
                <CustomLink to="/Login">
                  Login
                </CustomLink>
              )}
            </ul>


          </ul>

        </div>
      </div>
    </div>
  )
}


function CustomLink({ to, children, ...props }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <li className={path === to ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}