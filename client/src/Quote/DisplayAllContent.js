import React, { useState } from 'react';
import { useUserInfo } from './UserInfoProvider';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleAccordion} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
      {isOpen ? ' - ' : ' + '} <strong>{title}</strong>
            </div>
      
      {!isOpen && <div style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>{content}</div>}
    </div>
  );
};

const Accordion = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <AccordionItem key={index} title={section.title} content={section.content} />
      ))}
    </div>
  );
};

const DisplayAllContent = () => {
  const { userInfo } = useUserInfo();
  

  const Usercontent = () => (
    <ul>
      <li><strong>Name:</strong> {userInfo.name}</li>
      <li><strong>Fax:</strong> {userInfo.fax}</li>
      <li><strong>Phone:</strong> {userInfo.phone}</li>
      <li><strong>City:</strong> {userInfo.city}</li>
      <li><strong>Email:</strong> {userInfo.email}</li>
      <li><strong>Zipcode:</strong> {userInfo.zipcode}</li>
      <li><strong>Address:</strong> {userInfo.address}</li>
      <li><strong>Contact:</strong> {userInfo.contact}</li>
    </ul>
  );
  
  
  const RenderUserInsurance = () => {
    const userInsuranceKeys = Object.keys(userInfo.userInsurance);

    return (
      <div>
        <ul>
          {userInsuranceKeys.map(key => (
            <li key={key}><strong>{key}:</strong> {userInfo.userInsurance[key]}</li>
          ))}
        </ul>
      </div>
    );
  };


  const RenderUserCoverageReq = () => {
    const coverageRequest = Object.keys(userInfo.coverageRequest);

    return (
      <div>
        <ul>
          {coverageRequest.map(key => (
            <li key={key}><strong>{key}:</strong> {userInfo.coverageRequest[key]}</li>
          ))}
        </ul>
      </div>
    );
  };



  const RenderDriverInfo = () => (
    <div>
      <ul>
        {userInfo.driverInfo.map((driver, index) => (
          <li key={index}>
            <strong>Driver {index + 1} </strong> 

            <ul>
            {Object.entries(driver).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          </li>
        ))}
      </ul>
    </div>
  );
  
  const RenderVehicleInfo = () => (
    <div>
      <ul>
        {userInfo.vehiclesInfo.map((vehicle, index) => (
          <li key={index}>
            <strong>Vehicle {index + 1}</strong>

            <ul>
            {Object.entries(vehicle).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          </li>
        ))}
      </ul>
    </div>
  );
  



  const sections = [
    { title: 'Contact Info', content: <Usercontent />},
    { title: 'General Insurance Info', content: <RenderUserInsurance /> },
    { title: 'Coverage Request', content: <RenderUserCoverageReq /> },
    { title: 'Driver Info', content: <RenderDriverInfo />},
    { title: 'Vehicle Info', content: <RenderVehicleInfo /> },
  ];

  return (
    <div style={{ marginBottom: '35px', marginTop: '95px' }}>
      <Accordion sections={sections} />
    </div>
  );
};

export default DisplayAllContent;
