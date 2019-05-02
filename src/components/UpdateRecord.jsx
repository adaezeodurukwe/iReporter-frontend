// import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import {
//   func,
//   bool,
//   object as objectProp,
//   string,
// } from 'prop-types';
// import _ from 'underscore';


// // Import actions
// import { createRecord, clear, getRecord } from '../redux/actions';

// // Import components
// import Toast from './Toast';

// /**
//  * @class Signin
//  * @returns {HTMLElement} sign-in form
//  */
// class Update extends Component {
//   render () {
//     return (
//       <div></div>
//     );
//   }
// }


// /**
//  * @function mapDispatchToProps
//  * @param {*} dispatch
//  * @returns {object} actions
//  */
// function mapDispatchToProps(dispatch) {
//   return (bindActionCreators({
//     createNewRecord: createRecord,
//     clearError: clear,
//     getSingleRecord: getRecord,
//   }, dispatch));
// }

// /**
//  * @function mapStateToProps
//  * @param {*} state
//  * @returns {object} state
//  */
// function mapStateToProps({ records, initialValues }) {
//   const { created, error, record } = records;
//   return {
//     created,
//     error,
//     record,
//     initialValues,
//   };
// }

// Update.propTypes = {
//   createNewRecord: func.isRequired,
//   handleSubmit: func.isRequired,
//   getSingleRecord: func.isRequired,
//   history: objectProp.isRequired,
//   created: bool.isRequired,
//   error: objectProp.isRequired,
//   clearError: func.isRequired,
//   formHeader: string.isRequired,
//   match: objectProp,
//   record: objectProp.isRequired,
//   initialize: func.isRequired
// };

// Update.defaultProps = {
//   match: {}
// };


// export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Update)));
