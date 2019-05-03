/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  func,
  bool,
  object as objectProp,
} from 'prop-types';
import _ from 'underscore';


// Import actions
import { signIn, clear } from '../redux/actions';

// Import components
import Toast from './Toast';

/**
 * @class Signin
 * @returns {HTMLElement} sign-in form
 */
class SignIn extends Component {
  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const { clearError } = this.props;
    clearError();
  }

  clearAuthError = () => {
    const { clearError } = this.props;
    clearError();
  }

  /**
   * @method renderField
   * @param {object} field
   * @returns {HTMLElement} input
   */
  renderField = (field) => {
    if (field.meta.touched) this.clearAuthError();
    return (
      <div className="form-field">
        <label htmlFor={field.name}>
          {field.label}
          <input
            {...field.input}
            type={field.type}
          />
        </label>
        <p>
          {field.meta.touched ? field.meta.error : ''}
        </p>
      </div>
    );
  }

  /**
   * @method onSubmit
   * @param {object} values
   * @returns {function} signUpUser
   */
  onSubmit = (values) => {
    const { signInUser } = this.props;

    signInUser(values);
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/profile');
  }

  /**
   * @description render function
   * @returns {HTMLElement} form
   */
  render() {
    const { handleSubmit, loggedIn, error } = this.props;

    if (loggedIn) this.redirect();

    const addedClass = _.isEmpty(error) ? '' : 'show';

    const message = _.isEmpty(error) ? '' : error.message;
    return (
      <form className="form-container" onSubmit={handleSubmit(this.onSubmit)}>
        <h1><i>Sign In</i></h1>
        <div className="form-body">
          <Field
            label="Email"
            name="email"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderField}
            type="password"
          />
        </div>
        <div className="button">
          <button type="submit">Sign In</button>
        </div>
        <Toast
          message={message}
          addedClass={addedClass}
        />
      </form>
    );
  }
}

/**
 * @function validate
 * @param {*} values
 * @returns {object} errors
 */
const validate = (values) => {
  const errors = {};

  if (!values.email) errors.email = 'Enter email';
  if (!values.password) errors.password = 'Enter password';

  return errors;
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return (bindActionCreators({
    signInUser: signIn,
    clearError: clear,
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ auth }) {
  const { loggedIn, error } = auth;
  return {
    loggedIn,
    error,
  };
}

SignIn.propTypes = {
  signInUser: func.isRequired,
  handleSubmit: func.isRequired,
  history: objectProp.isRequired,
  loggedIn: bool.isRequired,
  error: objectProp.isRequired,
  clearError: func.isRequired,
};


export default reduxForm({
  validate,
  form: 'signinform',
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn)));
