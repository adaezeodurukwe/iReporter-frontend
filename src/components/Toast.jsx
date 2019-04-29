/* eslint-disable require-jsdoc */
import React from 'react';
import { string } from 'prop-types';

const ToastMaster = ({ message, addedClass }) => (
  <div id="snackbar" className={`${addedClass}`}><p id="errormsg">{message}</p></div>
);

ToastMaster.propTypes = {
  message: string.isRequired,
  addedClass: string.isRequired,
};

export default ToastMaster;
