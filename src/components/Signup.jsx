import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool, object as objectProp } from 'prop-types';
import _ from 'underscore';

// Import actions
import { signUp, clear } from '../redux/actions';

// Import components
import Toast from './Toast';


/**
 * @class SignUp
 * @returns {HTMLElement} sign-up forn
 */
export class SignUp extends Component {
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
    const { signUpUser } = this.props;

    signUpUser(values);
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/profile');
  }

  /**
   * @method render
   * @returns {HTMLElement} sign-up form
   */
  render() {
    const { handleSubmit, signedUp, error } = this.props;

    if (signedUp) this.redirect();

    const addedClass = _.isEmpty(error) ? '' : 'show';

    const message = _.isEmpty(error) ? '' : error.message;

    return (
      <form className="form-container" onSubmit={handleSubmit(this.onSubmit)}>
        <h1><i>Sign Up</i></h1>
        <div className="form-body">
          <Field
            label="Firstname"
            name="firstname"
            component={this.renderField}
          />
          <Field
            label="Lastname"
            name="lastname"
            component={this.renderField}
          />
          <Field
            label="Other names"
            name="othernames"
            component={this.renderField}
          />
          <Field
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Phone number"
            name="phone"
            component={this.renderField}
            type="number"
          />
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
          <Field
            label="Confirm Password"
            name="confirmPassword"
            component={this.renderField}
            type="password"
          />
        </div>
        <div className="button">
          <button type="submit">Sign Up</button>
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

  if (!values.firstname) errors.firstname = 'Enter firstname';
  if (!values.lastname) errors.lastname = 'Enter lastname';
  if (!values.username) errors.username = 'Enter username';
  if (!values.email) errors.email = 'Enter email';
  if (!values.phone) errors.phone = 'Enter valid phone number';
  if (!values.password) errors.password = 'Enter password';
  if (!values.confirmPassword) errors.confirmPassword = 'Confirm Password';
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Password mismatched';

  return errors;
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return (bindActionCreators({
    signUpUser: signUp,
    clearError: clear,
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ auth }) {
  const { signedUp, error } = auth;
  return {
    signedUp,
    error,
  };
}

SignUp.propTypes = {
  signUpUser: func.isRequired,
  handleSubmit: func.isRequired,
  history: objectProp.isRequired,
  signedUp: bool.isRequired,
  error: objectProp.isRequired,
  clearError: func.isRequired,
};

export default reduxForm({
  validate,
  form: 'signUpForm',
})(
  connect(mapStateToProps, mapDispatchToProps)(SignUp),
);
