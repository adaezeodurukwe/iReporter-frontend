import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  func,
  array as arrayProp,
} from 'prop-types';

// Import Action
import { getUserRecord } from '../redux/actions';

// import Component
import Dashboard from './DashboardStatus';
import Card from './Cards';
import Min from './MinNav';

/**
 * @function Profile
 * @param {array} records
 * @returns {HTMLElement} Profile page
 */
class Profile extends Component {
  /**
   * @returns {object} articles
   */
  componentDidMount() {
    const { getRecords } = this.props;
    getRecords();
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
        return (
          <Card
            key={index.toString()}
            type={record.type}
            status={record.status}
            location={record.location}
            comment={record.comment}
            recType={recordType}
            id={record.id}
          />
        );
      });
    }
    return content;
  }


  /**
   * @returns {HTMLElement} profile
   */
  render() {
    const { records } = this.props;
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
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ records }) {
  return records;
}

Profile.propTypes = {
  getRecords: func.isRequired,
  records: arrayProp.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
