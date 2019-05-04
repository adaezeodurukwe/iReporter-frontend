import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @function Cards
 * @returns {HTMLElement} card
 */
const MinNav = () => (
  <div className="min-nav">
    <ul>
      <li>
        <Link to="/create">Add</Link>
      </li>
      <li>
        <Link to="/profile">My Records</Link>
      </li>
    </ul>
  </div>
);


export default MinNav;
