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

      {!isOpen && (
        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
          {content}
        </div>
      )}
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
      {userInfo.driverInfo.map((driver, index) => (
        <div key={index}>
          <strong>Driver {index + 1}</strong>
          <ul>
            {Object.entries(driver).map(([key, value]) => (
              <li key={key}>
                {typeof value === 'object' ? (
                  <ul>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <li key={nestedKey}>
                        <strong>{nestedKey}:</strong> {nestedValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>
                    <strong>{key}:</strong> {value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );



  const RenderVehicleInfo = () => (
    <div>
      {userInfo.vehiclesInfo.map((vehicle, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>Vehicle {index + 1}</strong>
          <ul>
            {Object.entries(vehicle).map(([key, value]) => (
              <li key={key}>
                {typeof value === "object" ? (
                  <ul>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <li key={nestedKey}>
                        <strong>{nestedKey}:</strong> {nestedValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <strong>{key}:</strong> {value}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );


  const sections = [
    { 
      title: <div className='displayTitleColor'>Contact Info</div>, 
      content: <div className='displayParColor'><Usercontent /></div> 
    },
    { 
      title: <div className='displayTitleColor'>General Insurance Info</div>, 
      content: <div className='displayParColor'><RenderUserInsurance /></div> 
    },
    { 
      title: <div className='displayTitleColor'>Coverage Request</div>, 
      content: <div className='displayParColor'><RenderUserCoverageReq /></div> 
    },
    { 
      title: <div className='displayTitleColor'>Driver Info</div>, 
      content: <div className='displayParColor'><RenderDriverInfo /></div> 
    },
    { 
      title: <div className='displayTitleColor'>Vehicle Info</div>, 
      content: <div className='displayParColor'><RenderVehicleInfo /></div> 
    },
  ];
  

  return (
    <div style={{ marginBottom: '35px', marginTop: '95px' }}>
      <h2 style={{ fontSize: '50px', color: 'rgb(63, 89, 120)' }}> Quote Confirmation Page </h2>

      <Accordion sections={sections} />
    </div>
  );
};

export default DisplayAllContent;
