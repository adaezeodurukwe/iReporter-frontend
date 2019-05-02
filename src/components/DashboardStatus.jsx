import React from 'react';
import { number } from 'prop-types';

/**
 * @function DashboardStatus
 * @returns {HTMLElement} status cards
 */
const DashboardStatus = ({
  draft, investigation, resolved, rejected
}) => (
  <div className="status">
    <div className="status-cards card-draft">
      <p id="draft">{draft}</p>
      <p>Draft</p>
    </div>
    <div className="status-cards card-investigation">
      <p id="investigation">{investigation}</p>
      <p>Under Investigaton</p>
    </div>
    <div className="status-cards card-resolved">
      <p id="resolved">{resolved}</p>
      <p>Resolved</p>
    </div>
    <div className="status-cards card-rejected">
      <p id="rejected">{rejected}</p>
      <p>Rejected</p>
    </div>
  </div>
);

DashboardStatus.propTypes = {
  draft: number.isRequired,
  investigation: number.isRequired,
  resolved: number.isRequired,
  rejected: number.isRequired,
};

export default DashboardStatus;
