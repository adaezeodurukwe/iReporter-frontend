import React from 'react';

/**
 * @function Faq
 * @returns {HTMLElement} FAQ
 */
const Faq = () => (
  <div className="records">
    <h2>FAQ</h2>
    <div className="faq">
      <div className="max-cards">
        <h4>What differentiates a red flag from an intervention?</h4>
        <i>Answer:</i>
        <p>
          Both record types draw attention to things going bad,
          {' '}
          but while a red flag reports wrongdoing by a government official of contractor eg.
          {' '}
          for misappropriation,
          {' '}
          an intervention reports an incident that does not necessarily involve people but needs
          {' '}
          government intervention like an area where a bridge is needed or roads gone bad.
        </p>

      </div>
      <div className="max-cards">
        <h4>How do I participate?</h4>
        <i>Answer:</i>
        <p>Simple! Create an account.</p>

      </div>
      <div className="max-cards">
        <h4>What happens after I create a record?</h4>
        <i>Answer:</i>
        <p>
          The record will be confirmed and monitored,
          {' '}
          if it is found to be false and misleading,it will be rejected; if and action is taken,
          {' '}
          the status of the record will be changed to either under investigation or resolved.
        </p>

      </div>
    </div>
  </div>
);

export default Faq;
