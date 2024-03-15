import React  from 'react';
import Navbar from './Components/Header';
// import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Agent from './Agent/Agent';
import Quote from './Quote/Quote';
import Login from './Login/Login';
import Calendar from './Calendar/CalendarApp';
import ConfirmationPage from './Appointment/ConfirmationPage';
import SignUp from './Login/SignUp';
import EmailVerification from './Login/EmailVerification';
import AccountSetUp from "./Login/Guest/AccountSetUp";
import LoginType from './Login/Guest/Login-Type';
import Review from './ReviewPage/ReviewPage';
import MakeReview from './ReviewPage/MakeReviewPage';
import AppointmentBooking from './Appointment/AppointmentBooking';
import { FormProvider } from './Quote/FormProvider';
import { UserInfoProvider } from './Quote/UserInfoProvider';

import AutoPage from './pages/AutoPage';
import AutoRegistration from './pages/AutoRegistration';
import BoatPage from './pages/BoatPage';
import BusinessPage from './pages/BusinessPage';
import ClassicCarPage from './pages/ClassicCarPage';
import CommericalAutoPage from './pages/CommericalAutoPage';
import HomeOwnersPage from './pages/HomeOwnerPage';
import MotorCyclePage from './pages/MotorCyclePage';
import RvPage from './pages/RvPage';

import RestPassword from './Login/RestPassword/RestingPassword';
import SendingEmailRestInfo from './Login/RestPassword/SendingEmailRestInfo';

import ConfirmationQoutePage from './Quote/ConfirmationQoutePage.js';


import ContactUsPage from './pages/ContactUsPage';



/* rfce */

// client side architecure
// Serverless architecture or function-as-a-service (FaaS).
// RESTful architectural style
// use of ajax 
// using ORM object relational mapping for database operation
// statlesss-enviroment: using tokens

// mvc articture 


function App() {
  // const isAuthenticated = false; // Replace with your authentication logic

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Quote" element={<FormProvider>   <UserInfoProvider><Quote /></UserInfoProvider></FormProvider>} />
          {/* <Route path = "/Quote" element = {<Quote />} /> */}

          <Route exact path="/Agent" element={<Agent />} />
          <Route exact path="/Agent/Calender" element={<Calendar />} />
          <Route exact path="/Agent/Appointment/ConfirmationPage" element={<ConfirmationPage />} />
          {/* <Route exact path = "/hidden"  render={() => isAuthenticated ? <HiddenComponent /> : <Redirect to="/" />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AccountSetUp" element={<AccountSetUp />} />
          <Route path="/Login-Type" element={<LoginType />} />
          <Route path="/SignUp/EmailVerification" element={<EmailVerification />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/MakeReview" element={<MakeReview />} />
          <Route path="/AppointmentBooking" element={<AppointmentBooking />} />
          <Route path="/RestPassword" element={<RestPassword />} />
          <Route path="/SendingEmailRestInfo" element={<SendingEmailRestInfo />} />
          <Route path="/ConfirmationQoutePage" element={<ConfirmationQoutePage />} />



          <Route path="/AutoPage" element={<AutoPage />} />
          <Route path="/AutoRegistration" element={<AutoRegistration />} />
          <Route path="/BoatPage" element={<BoatPage />} />
          <Route path="/BusinessPage" element={<BusinessPage />} />
          <Route path="/ClassicCarPage" element={<ClassicCarPage />} />
          <Route path="/CommericalAutoPage" element={<CommericalAutoPage />} />
          <Route path="/HomeOwnersPage" element={<HomeOwnersPage />} />
          <Route path="/MotorCyclePage" element={<MotorCyclePage />} />
          <Route path="/RvPage" element={<RvPage />} />
          <Route path="/ContactUsPage" element={<ContactUsPage />} />



        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App

