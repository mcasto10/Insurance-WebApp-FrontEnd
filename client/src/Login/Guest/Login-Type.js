import React from 'react';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

import GuestStatus from '../../assets/GuestStatus.png';

import SignInStatus from '../../assets/SignInStatus.png';

const LoginGuest = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = queryString.parse(location.search);


    const LoginPage = queryParams.routeFrom === 'LoginPage'; // Ensure comparison is strict

    const ReviewPage = queryParams.routeFrom === 'ReviewPage'; // Ensure comparison is strict


    const officeName = queryParams.officeName;
    const officeLocation = queryParams.officeLocation;
    const appointmentDate = queryParams.appointmentDate;
    const appointmentTime = queryParams.appointmentTime;

    const handleSignIn = () => {

        if (LoginPage) {
            navigate(`/Login?officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&fromLoginType=true`);
        }

        if (ReviewPage) {
            navigate("/Login?fromReviewLoginStatus=true");
        }
    }


    const handleGuest = () => {

        if (LoginPage) {
            navigate(`/AccountSetUp?officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&fromAccountSetUp=true`);

        }
        if (ReviewPage) {
            navigate("/MakeReview?user=Guest");
        };

    };

    // const handleCreateAccount = () => {

    //     if (LoginPage) {
    //         navigate(`/SignUp?officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&fromAccountSetUp=true`);
    //     }

    //     if (ReviewPage) {
    //         navigate(`/SignUp`);
    //     }

    // };

    return (
        // <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', textAlign: 'center', padding: '20px' }}>
        <div style={{  maxWidth: '950px', margin: 'auto', textAlign: 'center', padding: '20px' }}>

            <h1 style={{ fontSize: '60px', display: 'flex', alignItems: 'center', color: '#3f5978', justifyContent: 'center' }}>
                How would you like to proceed</h1>
            {/* <hr style={{ border: '1px solid #3f5978', width: '80%', margin: '20px auto' }} /> */}
            <div className='line' style={{ borderBottom: '1px solid #3f5978', width: '100%', margin: '10px 0' }}></div>

            <div style={{ display: 'flex', margin: 'auto', textAlign: 'center', justifyContent: 'space-around', color: '#3f5978' }}>
                <div
                    onClick={handleSignIn}
                    className='hoverButton' // Add className for styling
                    style={{
                        border: '1px solid #3f5978',
                        borderRadius: '5px',
                        width: '30%',
                        padding: '20px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease', // Add a smooth transition effect
                    }}
                    // Add hover styles inline
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                     <div className="accountSetUpH2"> Continue to Sign In</div>
                    <div className='line' style={{ borderBottom: '1px solid #3f5978', width: '100%', margin: '10px 0' }}></div>

                    <div style={{ marginBottom: '10px' }}>
                        <img src={SignInStatus} alt="SignInStatus" style={{ maxWidth: '73%', height: 'auto' }} />
                    </div>
                    <button style={{ marginTop: '10px', border: '1px solid #3f5978',background: '#3F5978',  borderRadius: '5px', padding: '10px', width: '80%' }}>
                        Sign In
                    </button>
                </div>



                {/* <div style={{ borderRight: '1px solid #3f5978' }}></div> */}

                <div
                    onClick={handleGuest}
                    className='hoverButton' // Add className for styling
                    style={{
                        border: '1px solid #3f5978',
                        borderRadius: '5px',
                        width: '30%',
                        padding: '20px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease', // Add a smooth transition effect
                    }}
                    // Add hover styles inline
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                       <div className="accountSetUpH2"> Continue as guest</div>
                    <div className='line' style={{ borderBottom: '1px solid #3f5978', width: '100%', margin: '10px 0' }}></div>

                    <div style={{ marginBottom: '10px' }}>
                        <img src={GuestStatus} alt="GuestStatus" style={{  maxWidth: '73%', height: 'auto' }} />
                    </div>
                    <button
                        style={{ marginTop: '10px',  background: '#3F5978', border: '1px solid #3f5978', borderRadius: '5px', padding: '10px', width: '80%' }}
                    >
                 Guest
                    </button>
                </div>


                {/* Need to work on this, create for navigation */}
                {/* <div style={{ borderRight: '1px solid #3f5978'}}></div> */}

                {/* <div
                    onClick={handleCreateAccount}
                    className='hoverButton' // Add className for styling
                    style={{
                        border: '1px solid #3f5978',
                        borderRadius: '5px',
                        width: '30%',
                        padding: '20px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease', // Add a smooth transition effect
                    }}
                    // Add hover styles inline
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >                     <div className="accountSetUpH2"> Continue to create a new account</div>
                    <div className='line' style={{ borderBottom: '1px solid #3f5978', width: '100%', margin: '10px 0' }}></div>

                    <div style={{ marginBottom: '10px' }}>
                        <img src={CreateNewAccount} alt="CreateNewAccount" style={{ maxWidth: '55%', height: 'auto' }} />
                    </div>
                    <button
                        className='hoverButton'  // Add className for styling

                        onClick={handleCreateAccount} style={{ marginTop: '10px', border: '1px solid #3f5978', borderRadius: '5px', padding: '10px', width: '80%' }}>Create an account</button>
                </div> */}

            </div>
        </div>
    );
};

export default LoginGuest;
