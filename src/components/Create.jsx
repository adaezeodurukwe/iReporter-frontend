import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  func,
  bool,
  object as objectProp,
  string,
} from 'prop-types';
import _ from 'underscore';


// Import actions
import { createRecord, clear } from '../redux/actions';

// Import components
import Toast from './Toast';

/**
 * @class Signin
 * @returns {HTMLElement} sign-in form
 */
class Create extends Component {
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
    const { createNewRecord } = this.props;

    createNewRecord(values);
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
    const {
      handleSubmit,
      created,
      error,
      formHeader,
    } = this.props;

    if (created) this.redirect();

    const addedClass = _.isEmpty(error) ? '' : 'show';

    const message = _.isEmpty(error) ? '' : error.message;
    return (
      <form className="form-container" onSubmit={handleSubmit(this.onSubmit)}>
        <h1><i>{formHeader}</i></h1>
        <div className="create">
          <Field name="type" component="select" id="type">
            <option>Choose Type</option>
            <option value="red flag">Red Flag</option>
            <option value="intervention">Intervention</option>
          </Field>
          <Field
            label="Location"
            name="location"
            component={this.renderField}
            type="text"
          />
          <Field
            label="Comment"
            name="comment"
            component={this.renderField}
            type="textarea"
          />
        </div>
        <div className="button">
          <button type="submit">Submit</button>
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

  if (!values.comment) errors.comment = 'Enter comment';
  if (!values.location) errors.location = 'Enter location';

  return errors;
};

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return (bindActionCreators({
    createNewRecord: createRecord,
    clearError: clear,
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ recs }) {
  const { created, error } = recs;
  return {
    created,
    error,
  };
}

Create.propTypes = {
  createNewRecord: func.isRequired,
  handleSubmit: func.isRequired,
  history: objectProp.isRequired,
  created: bool.isRequired,
  error: objectProp.isRequired,
  clearError: func.isRequired,
  formHeader: string.isRequired,
};


export default reduxForm({
  validate,
  form: 'createform',
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Create)));
