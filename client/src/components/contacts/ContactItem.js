import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contacts/contactContext';

export const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, firstName, lastName,telephoneNumber, address, SSN } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {firstName}{' '}{lastName}      
      </h3>
      <ul className="list">
        {address && (
          <li>
            <i className="fas fa-link"></i>
            {' ' + address}
          </li>
        )}
        {telephoneNumber && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {' ' + telephoneNumber}
          </li>
        )}
        {SSN && (
          <li>
            <i className="fas fa-key"></i>
            {' ' + SSN}
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
