import { combineReducers } from 'redux';

// store user message information
const totalActions = (state = [], action) => {
  switch (action.type) {
    case 'SET_TOTAL_ACTIONS':
      return action.payload;
    default:
      return state;
  }
};

export default totalActions;