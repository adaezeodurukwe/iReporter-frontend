import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  array as arrayProp, func, object as objectProp, bool
} from 'prop-types';
import _ from 'underscore';

// Import actions
import { getRecords, closeNav } from '../redux/actions';

// Import image
import add from '../assets/img/add.png';
import flag from '../assets/img/flag.png';
import report from '../assets/img/report.png';


/**
 * @class Records
 * @returns {HTMLElement} records
 */
export class Records extends Component {
  /**
   * @method componentDidMount
   * @returns {object} Records
   */
  componentDidMount() {
    const { getAllRecords, close } = this.props;
    close();
    getAllRecords();
  }

  displayRecords = () => {
    const { records } = this.props;
    let content = '';
    if (_.isEmpty(records)) content = <div className="none">NO RECORD</div>;
    else {
      content = records.map((record, index) => {
        const img = record.type === 'intervention' ? report : flag;
        const recordType = record.type.replace(/ /g, '');
        return (
          <div key={index.toString()} className="cards">
            <h4>
              <img src={img} alt="cardImg" />
              {record.type}
            </h4>
            <p>{record.comment}</p>
            <p>
              Status:
              <i className="draft">
                {record.status}
              </i>
            </p>
            <Link to={`../details/${recordType}/${record.id}`}>
              <button type="button">
                Details
              </button>
            </Link>
          </div>
        );
      });
    }
    return content;
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/details');
  }

  /**
   * @returns {HTMLElement} records
   */
  render() {
    const { loggedIn } = this.props;
    return (
      <div className="records">
        <h2>RECORDS</h2>
        <div className="records-body">
          <div className="records-main" id="main">
            {loggedIn && (
              <div className="first_cards">
                <Link to="./create"><img src={add} alt="add" /></Link>
              </div>
            )}
            {this.displayRecords()}
          </div>
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
    getAllRecords: getRecords,
    close: closeNav
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ recs, auth }) {
  const { records } = recs;
  const { loggedIn } = auth;
  return { records, loggedIn };
}

Records.propTypes = {
  records: arrayProp.isRequired,
  getAllRecords: func.isRequired,
  history: objectProp.isRequired,
  loggedIn: bool.isRequired,
  close: func.isRequired
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Records)));
