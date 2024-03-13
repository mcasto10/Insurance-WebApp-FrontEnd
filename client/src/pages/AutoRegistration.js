import { useNavigate } from 'react-router-dom';
import './PageLayout.css';
import React from 'react';
import TransferAuto from '../assets/TransferAuto.png';

export default function AutoRegistrationPage() {

    const navigate = useNavigate();

    const handleQuote = () => {
        navigate('/Quote')
    }


    const handleContact = () => {
        navigate('/ContactUsPage')

    }


    return (
        <div className='pageLayout'>
            <div className='flexContainer'>
                <div className='leftContent'>
                    <h1 style={{ fontSize: '60px', color: '#3F5978' }}> Auto Registrations Services Insurance </h1>
                    <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '18px' }}>
                        Effective, October 1st, 2006, if you allow your insurance to cancel or if the coverage is
                        interrupted for any reason, DMV will cancel your vehicle registration and suspend your
                        driver's license if you get into an accident without insurance. Keep your insurance in
                        force by making your payments on time.
                    </p>
                    <div className='buttonContainer'>
                        <button className='AutoRegButton' onClick={handleQuote}>Get a Quote</button>
                        <button className='AutoRegButton' onClick={handleContact}>Contact Us</button>
                    </div>
                </div>

                <div className='rightContent'>
                    <img src={TransferAuto} alt='TransferAuto' />
                </div>
            </div>

            <div className='line'> </div>


            <div className='bottomContent'>
                <div className='flexContainer'>
                    <div className='leftContent'>

                        <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '18px' }}>
                            Don’t waste your time on long lines at the DMV. Get your stickers in Minutes!
                            We know your time is valuable, let us help you by giving you the best service.
                            We can always help you with and in our commitment of giving our customers the best
                            service, we provide you with:


                            <div style={{ marginTop: "20px" }}>
                                <li>Vehicle Registrations</li>
                                <li>Instant Renewals</li>
                                <li>Title transfers</li>
                            </div>

                        </p>
                    </div>

                    <div className='rightContent'>

                        <div className='flexContainer'>
                            {/* <div className='leftContent'> */}
                                <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '18px' }}>

                                    To expedite the process of your renewals, please bring the following:

                                    <div style={{ marginTop: "20px" }}>
                                        <li>Smog Check (If required by DMV)</li>
                                        <li>Proof of valid Insurance</li>
                                        <li>Renewal Slip</li>
                                        <li>Fees Due (inquire within)</li>
                                    </div>
                                </p>

                            {/* </div> */}

                            {/* <div className='rightContent'> */}
                                <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '18px' }}>

                                    For title transfers, please bring the following:
                                    <div style={{ marginTop: "20px" }}>

                                        <li>Pink slip. If it’s lost you can bring the registration or the renewal slip</li>
                                        <li>Smog Check</li>
                                        <li>Proof of valid Insurance</li>
                                        <li>Copy of ID</li>
                                        <li>Fees Due (inquire within)</li>
                                    </div>
                                </p>

                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
