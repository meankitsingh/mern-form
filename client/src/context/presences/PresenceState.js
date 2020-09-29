import React, { useReducer } from 'react';
import ContactContext from './presenceContext';
import ContactReducer from './presenceReducer';
import axios from 'axios';

import {
  ADD_PRESENCE,
  DELETE_PRESENCE,
  UPDATE_PRESENCE,
  FILTER_PRESENCES,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  PRESENCE_ERROR,
  GET_PRESENCES,
  CLEAR_PRESENCES
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts');
      dispatch({ type: GET_PRESENCES, payload: res.data });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const clearContacts = () => {
    dispatch({
      type: CLEAR_PRESENCES
    });
  };

  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/contacts',
        contact,
        config
      );
      dispatch({ type: ADD_PRESENCE, payload: res.data });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const deleteContact = async id => {
    try {
      // eslint-disable-next-line
      const res = await axios.delete(
        `http://localhost:5000/api/contacts/${id}`
      );
      dispatch({ type: DELETE_PRESENCE, payload: id });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      console.log('HELLO');
      const res = await axios.put(
        `http://localhost:5000/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_PRESENCE, payload: res.data });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterContacts = text => {
    dispatch({ type: FILTER_PRESENCES, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
