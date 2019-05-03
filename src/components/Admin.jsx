import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
  func,
  array as arrayProp,
  object as objectProp,
  bool,
} from 'prop-types';
import _ from 'underscore';

// Import Action
import {
  getRecords,
  clear,
  updateStatus,
  getUser,
} from '../redux/actions';

// import Component
import Dashboard from './DashboardStatus';
import Toast from './Toast';

/**
 * @Class Admin
 * @param {array} records
 * @returns {HTMLElement} Profile page
 */
class Admin extends Component {
  state = {
    type: '',
    id: '',
    status: '',
    show: false,
    loading: true,
    authorized: false,
    action: 'Update'
  }

  /**
   * @returns {object} articles
   */
  componentDidMount() {
    const {
      getOneUser,
      getAllRecords,
      clearErrors,
    } = this.props;
    getOneUser();
    clearErrors();
    getAllRecords();
  }


  /**
   * @param {string} status
   * @param {string} type
   * @param {string} id
   * @returns {object} state
   */
  getType = (status, type, id) => {
    const { show, action } = this.state;
    const newAction = action === 'Update' ? 'Cancel' : 'Update';

    this.setState({
      type,
      id,
      status,
      show: !show,
      action: newAction,
    });
  }

  displayRecords = () => {
    const { records } = this.props;
    let content = '';

    if (!records[0]) {
      content = (
        <div>
          <p id="none">NO RECORDS</p>
        </div>
      );
    } else {
      content = records.map((record, index) => {
        const recordType = record.type.replace(/ /g, '');
        const { show, id, status } = this.state;
        const newclass = show === true && id === record.id ? 'show' : 'hide';
        return (
          <div key={index.toString()} className="pmax-cards">
            <div className="card-body">
              <div className="flag">
                <span>
                  <h4>{record.type}</h4>
                </span>
                <span>
                  <b>Status: </b>
                  {record.status}
                </span>
                <span>
                  <b>Location: </b>
                  {record.location}
                </span>
                <span>
                  <b>Comment: </b>
                  {record.comment}
                </span>
                <div className="cards-footer">
                  <Link to={`./details/${recordType}/${record.id}`}>
                    <button type="button" className="view">View</button>
                  </Link>
                  <button type="button" onClick={() => { this.getType(record.status, recordType, record.id); }} className="edit">Update</button>
                </div>
              </div>
              <div className={`update ${newclass}`}>
                <form onSubmit={this.updateOneRecord}>
                  <ul>
                    <li>
                      <label>
                        <input
                          type="radio"
                          value="draft"
                          checked={status === 'draft'}
                          onChange={this.handleInputChange}
                          disabled
                        />
                        Draft
                      </label>
                    </li>

                    <li>
                      <label>
                        <input
                          type="radio"
                          value="under investigation"
                          checked={status === 'under investigation'}
                          onChange={this.handleInputChange}
                        />
                        Under Investigation
                      </label>
                    </li>

                    <li>
                      <label>
                        <input
                          type="radio"
                          value="resolved"
                          checked={status === 'resolved'}
                          onChange={this.handleInputChange}
                        />
                        Resolved
                      </label>
                    </li>

                    <li>
                      <label>
                        <input
                          type="radio"
                          value="rejected"
                          checked={status === 'rejected'}
                          onChange={this.handleInputChange}
                        />
                        Rejected
                      </label>
                    </li>
                  </ul>
                  <button type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
        );
      });
    }
    return content;
  }

  /**
   * @param {Event} e
   * @returns {object} state
   */
  handleInputChange = (e) => {
    // const { clearErrors } = this.props;
    // clearErrors();
    this.setState({
      status: e.target.value
    });
  };

  reload = () => {
    const { getAllRecords, clearErrors } = this.props;
    this.setState({
      status: '',
      show: false
    });
    getAllRecords();
    clearErrors();
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/signin');
  }


  /**
   * @param {Event} e
   * @returns {undefined}
   */
  updateOneRecord = (e) => {
    e.preventDefault();
    const { updateOne } = this.props;
    const { type, id } = this.state;
    updateOne(type, id, this.state);
  }

  /**
   * @returns {HTMLElement} profile
   */
  render() {
    const {
      records, updated, error, user, autherror
    } = this.props;

    if ((_.isEmpty(user) && autherror.message)
    || (!_.isEmpty(user) && user.status !== true)) this.redirect();


    if (updated) this.reload();

    let draft = 0;
    let investigation = 0;
    let resolved = 0;
    let rejected = 0;
    records.forEach((record) => {
      const recordStatus = record.status;

      if (recordStatus === 'draft') draft += 1;
      else if (recordStatus === 'under investigation') investigation += 1;
      else if (recordStatus === 'resolved') resolved += 1;
      else rejected += 1;
    });

    const addedClass = _.isEmpty(error) ? '' : 'show';

    const message = _.isEmpty(error) ? '' : error.message;
    return (
      <div className="profile">
        <h2>ADMIN</h2>
        <main>
          <h3>ALL RECORDS</h3>
          <Dashboard
            draft={draft}
            investigation={investigation}
            resolved={resolved}
            rejected={rejected}
          />
          <div id="red-flags">
            {this.displayRecords()}
          </div>
          <Toast
            message={message}
            addedClass={addedClass}
          />
        </main>
      </div>
    );
  }
}

/**
 * @function mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return (bindActionCreators({
    getAllRecords: getRecords,
    clearErrors: clear,
    getOneUser: getUser,
    updateOne: updateStatus,
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ recs, auth }) {
  const {
    records,
    updated,
    error,
  } = recs;
  const { user } = auth;
  const autherror = auth.error;
  return {
    records,
    updated,
    error,
    user,
    autherror
  };
}

Admin.propTypes = {
  autherror: objectProp.isRequired,
  user: objectProp.isRequired,
  getOneUser: func.isRequired,
  updateOne: func.isRequired,
  getAllRecords: func.isRequired,
  records: arrayProp.isRequired,
  updated: bool.isRequired,
  error: objectProp.isRequired,
  history: objectProp.isRequired,
  clearErrors: func.isRequired,
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin)));
