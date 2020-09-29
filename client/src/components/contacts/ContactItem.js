import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contacts/contactContext';

export const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, address, username, email, password, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {username}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {address && (
          <li>
            <i className="fas fa-link"></i>
            {' ' + address}
          </li>
        )}
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {' ' + email}
          </li>
        )}
        {password && (
          <li>
            <i className="fas fa-key"></i>
            {' ' + password}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
