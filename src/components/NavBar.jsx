import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  bool,
  func,
} from 'prop-types';
import classNames from 'classnames';

// Import Action
import {
  logout,
  closeNav,
  openNav
} from '../redux/actions';

/**
 * @function NavBar
 * @returns {HTMLElement} nav bar
 */
class NavBar extends Component {
  /**
   * @returns {htmlElement} nav
   */
  toggleNav() {
    const { showNav, open, close } = this.props;
    if (showNav === false) {
      return open();
    }
    return close();
  }

  /**
   * @returns {htmlElement} navbar
   */
  render() {
    const { loggedIn, logoutUser, showNav } = this.props;
    const menuStyle = classNames({
      burger: true,
      open: showNav
    });

    return (
      <div>
        <nav>
          <div className="inner">
            <div className="mobile">
              <div
                className="mobileNavButton"
                role="button"
                tabIndex={0}
                onClick={() => this.toggleNav()}
                onKeyPress={() => this.toggleNav()}
              >
                <span className={menuStyle} />
              </div>
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
                    <span role="button" tabIndex={0} onKeyPress={() => { logoutUser(); }} onClick={() => { logoutUser(); }}>Logout</span>
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
        {showNav
          && (
          <div className="mobile-nav">
            <p><Link to="/records">Records</Link></p>
            {loggedIn
              && (<p><Link to="/profile">Profile</Link></p>)}
            <p><Link to="/faq">Faq</Link></p>
            {loggedIn && (<p><Link to="/create">Add Record</Link></p>)}
            {!loggedIn && (<p><Link to="/signin">Login</Link></p>)}
            {!loggedIn && (<p><Link to="/signup">Register</Link></p>)}
            {loggedIn
              && (<p><span role="button" tabIndex={0} onKeyPress={() => logoutUser()} onClick={() => logoutUser()}>Logout</span></p>)}
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
function mapStateToProps({ auth, recs }) {
  const { loggedIn } = auth;
  const { showNav } = recs;
  return {
    loggedIn,
    showNav
  };
}

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return (bindActionCreators({
    logoutUser: logout,
    close: closeNav,
    open: openNav
  }, dispatch));
}

NavBar.propTypes = {
  loggedIn: bool.isRequired,
  logoutUser: func.isRequired,
  close: func.isRequired,
  open: func.isRequired,
  showNav: bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
