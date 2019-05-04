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
  getUserRecord,
  clear,
  updateRecord,
  deleteRecord,
  getUser,
} from '../redux/actions';

// import Component
import Dashboard from './DashboardStatus';
import Toast from './Toast';
import Min from './MinNav';

/**
 * @class Profile
 * @param {array} records
 * @returns {HTMLElement} Profile page
 */
export class Profile extends Component {
  state = {
    type: '',
    id: '',
    location: '',
    comment: '',
    show: false,
    action: 'Update'
  }

  /**
   * @returns {object} articles
   */
  componentDidMount() {
    const { getRecords, clearErrors, getOneUser } = this.props;
    getOneUser();
    clearErrors();
    getRecords();
  }

  /**
   * @param {string} comment
   * @param {string} location
   * @param {string} type
   * @param {string} id
   * @returns {object} state
   */
  getType = (comment, location, type, id) => {
    const { show, action } = this.state;
    const newAction = action === 'Update' ? 'Cancel' : 'Update';
    this.setState({
      type,
      id,
      comment,
      location,
      action: newAction,
      show: !show
    });
  }

  /**
   * @param {string} type
   * @param {string} id
   * @returns {undefined}
   */
  delete = (type, id) => {
    const { deleteOne } = this.props;
    deleteOne(type, id);
  }

  hideForm = () => {
    const { show } = this.state;
    if (show) this.setState({ show: false, action: 'Update' });
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
        const {
          show,
          id,
          location,
          comment,
          action,
        } = this.state;
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
                  <button type="button" onClick={() => { this.getType(record.comment, record.location, recordType, record.id); }} className="edit">{action}</button>
                  <button type="button" onClick={() => { this.delete(recordType, record.id); }} className="delete">Delete</button>
                </div>
              </div>
              <div className={`update ${newclass}`}>
                <form onSubmit={this.updateOneRecord}>
                  <label>
                    Location
                    <input
                      type="text"
                      name="location"
                      value={location}
                      className="location"
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <label>
                    Comment
                    <input
                      type="text"
                      name="comment"
                      value={comment}
                      className="comment"
                      onChange={this.handleInputChange}
                    />
                  </label>
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
    const { clearErrors } = this.props;
    clearErrors();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  reload = () => {
    const { getRecords, clearErrors } = this.props;
    this.hideForm();
    getRecords();
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
      records, updated, error, deleted, user, autherror
    } = this.props;

    if ((_.isEmpty(user) && autherror.message)) this.redirect();

    if (updated) this.reload();
    if (deleted) this.reload();

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
        <h2>PROFILE</h2>
        <main>
          <Min />
          <h3>MY RECORDS</h3>
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
    getRecords: getUserRecord,
    clearErrors: clear,
    updateOne: updateRecord,
    deleteOne: deleteRecord,
    getOneUser: getUser,
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
    deleted
  } = recs;
  const { user } = auth;
  const autherror = auth.error;

  return {
    records,
    updated,
    error,
    deleted,
    user,
    autherror,
  };
}

Profile.propTypes = {
  autherror: objectProp.isRequired,
  updateOne: func.isRequired,
  user: objectProp.isRequired,
  getOneUser: func.isRequired,
  deleteOne: func.isRequired,
  getRecords: func.isRequired,
  records: arrayProp.isRequired,
  updated: bool.isRequired,
  history: objectProp.isRequired,
  deleted: bool.isRequired,
  error: objectProp.isRequired,
  clearErrors: func.isRequired,
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)));
