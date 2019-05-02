import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

/**
 * @function Cards
 * @returns {HTMLElement} card
 */
const Cards = ({
  type, status, location, comment, id, recType,
}) => (
  <div className="pmax-cards">
    <div className="card-body">
      <div className="flag">
        <span>
          <h4>{type}</h4>
        </span>
        <span>
          <b>Status: </b>
          {status}
        </span>
        <span>
          <b>Location: </b>
          {location}
        </span>
        <span>
          <b>Comment: </b>
          {comment}
        </span>
        <div className="cards-footer">
          <Link to={`./details/${recType}/${id}`}>
            <button type="button" className="view">View</button>
          </Link>
          <Link to={`./update/${recType}/${id}`}>
            <button type="button" className="edit">Update</button>
          </Link>
          <button type="button" className="delete">Delete</button>
        </div>
      </div>
      <div className="update">
        <form>
          <label>
            Location
            <input
              type="text"
              name="location"
            />
          </label>
          <label>
            Comment
            <input
              type="text"
              name="comment"
            />
          </label>
          <input />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
);

Cards.propTypes = {
  type: string.isRequired,
  status: string.isRequired,
  location: string.isRequired,
  comment: string.isRequired,
  id: string.isRequired,
  recType: string.isRequired,
};

export default Cards;
