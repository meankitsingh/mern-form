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

export default (state, action) => {
  switch (action.type) {
    case GET_PRESENCES:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case CLEAR_PRESENCES:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null
      };
    case ADD_PRESENCE:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case DELETE_PRESENCE:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case PRESENCE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_PRESENCE:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
        current: null
      };
    case FILTER_PRESENCES:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.username.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
