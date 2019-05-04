/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';


// Import images
import opportunity from '../assets/img/opportunity.png';
import warning from '../assets/img/warning.png';
import conversation from '../assets/img/conversation.png';

// Import image
import scrutiny from '../assets/img/scrutiny.png';

/**
 * @function Home
 * @param {*} state
 * @returns {HTMLElement} home page
 */
const Home = () => (
  <div className="container">
    <div className="header">
      <div className="header-img">
        <img src={scrutiny} alt="home img" />
      </div>
      <div className="header-txt">
        <h1>See Something?</h1>
        <h1>Say Something.</h1>
        <p>Speak up,</p>
        <p>Curb corruption,</p>
        <p>Get attention to what neeeds fixing.</p>
        <div className="header-button">
          <Link to="/signup">
            <button type="button">Sign Up</button>
          </Link>
          <Link to="/signin">
            <button type="button">Log in</button>
          </Link>
        </div>
      </div>
    </div>
    <div className="row bg-white">

      <h1>About iReporter</h1>

      <div className="content">
        <div className="item">
          <img src={opportunity} alt="about" />
          <b>Introduction</b>
          <p>
            Corruption is a huge bane to Africa’s development.
            African countries must develop novel and localised solutions that will curb this menace,
            hence the birth of iReporter.
          </p>
        </div>
        <div className="item">
          <img src={warning} alt="about" />
          <b>Red Flag</b>
          <p>
            Red flag records are incidents linked to corruption.
            Find a public officer doing something questionable?
            It is time to speak up about it, get justice.
          </p>
        </div>
        <div className="item">
          <img src={conversation} alt="about" />
          <b>Intervention</b>
          <p>
            Intervention Records are a call for government agencies to intervene.
            Call attention to those bad roads, collapsed bridges,
            flooding and faulty social amenities
          </p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="info">
        <p>
          Find out more or have questions? Visit our
          {' '}
          <Link to="/faq">FAQ</Link>
          {' '}
          page
        </p>
      </div>
    </div>
  </div>
);


export default (withRouter(Home));
