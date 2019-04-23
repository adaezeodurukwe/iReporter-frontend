import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <nav>
      <div className="inner">
        <Link to="/"><h2>iReporter</h2></Link>
        <div className="links">
          <ul>
            <li>
              <Link to="/signin">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
            <li>
              <Link to="/faq">Faq</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/records">Records</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default NavBar;
