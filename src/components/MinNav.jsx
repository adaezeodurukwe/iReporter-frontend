import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

/**
 * @function Cards
 * @returns {HTMLElement} card
 */
const MinNav = ({ logout }) => (
  <div className="min-nav">
    <ul>
      <li>
        <span role="button" tabIndex={0} onKeyPress={() => { logout(); }} onClick={() => { logout(); }}>Logout</span>
      </li>
      <li>
        <Link to="/create">Add</Link>
      </li>
      <li>
        <Link to="/profile">My Records</Link>
      </li>
    </ul>
  </div>
);

MinNav.propTypes = {
  logout: func.isRequired,
};


export default MinNav;
