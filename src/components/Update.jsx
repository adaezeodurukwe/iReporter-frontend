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
import { createRecord, clear, getRecord } from '../redux/actions';

// Import components
import Toast from './Toast';

/**
 * @class Signin
 * @returns {HTMLElement} sign-in form
 */
class Update extends Component {
  /**
   * @method componentDidMount
   * @returns {object} Article details
   */
  componentWillMount() {
    const { initialize } = this.props;
    initialize();
  }

  /**
   * @method componentDidMount
   * @returns {object} Article details
   */
  componentDidMount() {
    const { match, getSingleRecord, initialize } = this.props;
    const recordType = match.params.type === 'intervention' ? 'interventions' : 'red-flags';

    initialize();
    getSingleRecord(recordType, match.params.id);
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
            value={field.value}
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
      record,
      error,
      formHeader,
    } = this.props;

    const details = { type: '', comment: '', location: '' };

    if (!_.isEmpty(record)) {
      details.comment = record.data.data.comment;
      details.location = record.data.data.comment;
      details.type = record.data.data.type;
    }


    const addedClass = _.isEmpty(error) ? '' : 'show';

    const message = _.isEmpty(error) ? '' : error.message;

    return (
      <form className="form-container" onSubmit={handleSubmit(this.onSubmit)}>
        <h1><i>{formHeader}</i></h1>
        <div className="create">
          <div id="type">
            {details.type}
          </div>
          <Field
            label="Location"
            name="location"
            component={this.renderField}
            type="text"
            value={details.location}
          />
          <Field
            label="Comment"
            name="comment"
            component={this.renderField}
            type="textarea"
            value={details.comment}
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
    getSingleRecord: getRecord,
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ records, initialValues }) {
  const { created, error, record } = records;
  return {
    created,
    error,
    record,
    initialValues,
  };
}

Update.propTypes = {
  createNewRecord: func.isRequired,
  handleSubmit: func.isRequired,
  getSingleRecord: func.isRequired,
  history: objectProp.isRequired,
  created: bool.isRequired,
  error: objectProp.isRequired,
  clearError: func.isRequired,
  formHeader: string.isRequired,
  match: objectProp,
  record: objectProp.isRequired,
  initialize: func.isRequired
};

Update.defaultProps = {
  match: {}
};


export default reduxForm({
  validate,
  enableReinitialize: true,
  form: 'update',
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Update)));
