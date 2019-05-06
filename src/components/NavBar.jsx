import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  bool,
} from 'prop-types';
import menu1 from '../assets/img/menu1.png';

/**
 * @function NavBar
 * @returns {HTMLElement} nav bar
 */
class NavBar extends Component {
  state = {
    show: false
  }

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ show: false });
  }

  /**
   * @returns {htmlElement} nav
   */
  showNav = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  /**
   * @returns {htmlElement} navbar
   */
  render() {
    const { show } = this.state;
    const { loggedIn } = this.props;


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
                {!loggedIn
                  && (
                  <li>
                    <Link to="/signin">Login</Link>
                  </li>
                  )
                }
                {!loggedIn
                  && (
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                  )
                }
                {loggedIn
                  && (
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  )
                 }
                <li>
                  <Link to="/faq">Faq</Link>
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
            {loggedIn
              && (<p><Link to="/profile">Profile</Link></p>)}
            <p><Link to="/faq">Faq</Link></p>
            <p><Link to="/create">Add Record</Link></p>
            {!loggedIn && (<p><Link to="/signin">Login</Link></p>)}
            {!loggedIn && (<p><Link to="/signup">Register</Link></p>)}
          </div>
          )
        }
      </div>
    );
  }
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ auth }) {
  const { loggedIn, closeNav } = auth;
  return {
    loggedIn,
    closeNav
  };
}

NavBar.propTypes = {
  loggedIn: bool.isRequired,
};

export default connect(mapStateToProps)(NavBar);
