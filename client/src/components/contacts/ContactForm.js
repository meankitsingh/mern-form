import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

export const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const {
    addContact,
    current,
    clearCurrent,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        address: '',
        username: '',
        email: '',
        password: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    address: '',
    username: '',
    email: '',
    password: '',
    type: 'personal'
  });

  const { address, username, email, password, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    setContact({
      address: '',
      username: '',
      email: '',
      password: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Address"
        name="address"
        value={address}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
