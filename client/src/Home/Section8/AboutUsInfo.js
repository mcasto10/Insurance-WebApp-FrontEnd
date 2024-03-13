import AboutUsImage from '../../assets/AboutUsImage.png';
import './AboutUsInfo.css';

export default function AboutUsInfo() {

return (
<div className="section8">
<div className='AboutUsPageLayOut'>

  <h1 style={{ textAlign: 'center', fontSize: '54px' }}> About Us</h1>

  <div className='AboutUsFlexContainer'>

    <div className='AboutUsLeft'>
      <img src={AboutUsImage} style={{ width: '95%', height: 'auto' }} />
    </div>
    <div className="AboutUsRight">
      <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '18px', marginTop: '35%' }}>
        We at AGREDANO REYNOSO INSURANCE SERVICES can help you find the insurance that is perfect for your needs and budget. With our wealth of experience and training as independent agents, we can obtain the best rates for the top quality products of the industry’s leading providers to give you the best combination of protection and price. </p>
    </div>
  </div>
</div>
</div>
)}