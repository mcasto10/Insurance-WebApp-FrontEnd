import TrustedPartner from '../../assets/TrustedPartner.png';
import VehicleRegistration from '../../assets/PersonOnComputer.jpeg';
import VehicleTransfer from '../../assets/PersonVehicleRegistration.png';

import './AutoRegistration.css';

import { useNavigate } from 'react-router-dom';

export default function AutoRegistration() {

    const navigate = useNavigate();

    const InsuranceInfo = [
        {
          title: "Vehicle Registrations",
          image: VehicleTransfer,
        },
        {
          title: "Title Transfer",
          image: TrustedPartner,
        },
        {
          title: "Instant Renewals",
          image: VehicleRegistration,
        }
      ];


  const InsuranceCards = ({ title, image, onClick }) => {
    return (
      <div className="insurance-card" onClick={onClick}>
        <h3>{title}</h3>
        <img src={image} alt={title} />
      </div>
    );
  };


  const handleLearnMoreAuto = () => {
    navigate('/AutoRegistration')
  }



    
    return (

        <div className="section4">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '54px', marginTop: '5%' }}>
            Auto Registration Services
          </h1>
        </div>
        {/* Insurance cards */}
        <div className="insurance-container" style={{ cursor: 'pointer' }}>
  {InsuranceInfo.map((type, index) => (
    <InsuranceCards
      key={index}
      title={type.title}
      image={type.image}
      onClick={handleLearnMoreAuto}
      style={{ transition: 'transform 0.3s' }} // Apply transition to each individual image
    />
  ))}
</div>

      </div>

    )
}