/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import menu1 from '../assets/img/menu1.png';

/**
 * @function mobileNav
 * @returns {HTMLElement} nav
 */
/**
 * @function NavBar
 * @returns {HTMLElement} nav bar
 */
class NavBar extends Component {
  state = {
    show: false
  }

  /**
   * @returns {htmlElement} nav
   */
  showNav = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  // const show = showNav();
  render() {
    const { show } = this.state;

    return (
      <div>
        <nav>
          <div className="inner">
            <div className="mobile">
              <button className="mobileNavButton" type="button" onClick={() => { this.showNav(); }}><img src={menu1} alt="mobilenav" /></button>
            </div>
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
        {show
          && (
          <div className="mobile-nav">
            <p><Link to="/records">Records</Link></p>
            <p><Link to="/profile">Profile</Link></p>
            <p><Link to="/faq">Faq</Link></p>
            <p><Link to="/create">Add Record</Link></p>
            <p><Link to="/logout">Logout</Link></p>
          </div>
          )
        }
      </div>
    );
  }
}

export default NavBar;
