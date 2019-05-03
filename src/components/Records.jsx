import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { array as arrayProp, func, object as objectProp } from 'prop-types';
import _ from 'underscore';

// Import actions
import { getRecords } from '../redux/actions';

// Import image
import add from '../assets/img/add.png';
import flag from '../assets/img/flag.png';
import report from '../assets/img/report.png';


/**
 * @class Records
 * @returns {HTMLElement} records
 */
class Records extends Component {
  /**
   * @method componentDidMount
   * @returns {object} Records
   */
  componentDidMount() {
    const { getAllRecords } = this.props;
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
    return (
      <div className="records">
        <h2>RECORDS</h2>
        <div className="records-body">
          <div className="records-main" id="main">
            <div className="cards">
              <Link to="./create"><img src={add} alt="add" /></Link>
            </div>
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
  }, dispatch));
}

/**
 * @function mapStateToProps
 * @param {*} state
 * @returns {object} state
 */
function mapStateToProps({ recs }) {
  const { records } = recs;
  return { records };
}

Records.propTypes = {
  records: arrayProp.isRequired,
  getAllRecords: func.isRequired,
  history: objectProp.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Records);
