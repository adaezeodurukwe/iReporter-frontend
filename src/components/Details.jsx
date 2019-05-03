/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  func,
  object as objectProp,
  shape,
  string,
  bool,
} from 'prop-types';
// import _ from 'underscore';


// Import map
import Map from './MapContainer';

// Import Action
import { getRecord } from '../redux/actions';


/**
 * @function Details
 * @returns {HTMLElement} records
 */
class Details extends Component {
  state = {
    comment: 'No comment',
    type: 'No Type',
    status: 'None',
  }

  /**
   * @returns {object} article
   */
  componentDidMount() {
    const { getSpecificRecord, match } = this.props;
    const { id, type } = match.params;
    const recordType = type === 'redflag' ? 'red-flags' : 'interventions';
    getSpecificRecord(recordType, id);
  }

  displaRecord = () => {
    const { record } = this.props;
    let content = '';
    if (record.status !== 200) {
      content = (
        <div>
          <Map />
          <div className="norecord">
            <p>No Record</p>
          </div>
        </div>
      );
    } else {
      const coordinates = record.data.data.location.split(',');
      const lattitude = parseFloat(coordinates[0]);
      const longitude = parseFloat(coordinates[1]);
      content = (
        <div>
          <Map
            latitude={lattitude}
            longitude={longitude}
          />
          <div className="commentdets">
            <p id="type">
              <b>Type:</b>
              {' '}
              {record.data.data.type}
            </p>
            <p id="status">
              <b>Status:</b>
              {' '}
              {record.data.data.status}
            </p>
            <p id="comment">
              <b>Comment:</b>
              <br />
              <br />
              {record.data.data.comment}
            </p>
          </div>
        </div>
      );
    }
    return content;
  }

  /**
   * @returns {HTMLElement} details
   */
  render() {
    return (
      <div className="records">
        <h2>DETAILS</h2>
        <div className="detail">
          {this.displaRecord()}
        </div>
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
    getSpecificRecord: getRecord,
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ recs }) {
  const { record } = recs;
  return { record };
}

Details.propTypes = {
  getSpecificRecord: func.isRequired,
  record: objectProp.isRequired,
  match: shape({
    isExact: bool,
    params: objectProp,
    path: string,
    url: string
  }).isRequired,
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Details)));
