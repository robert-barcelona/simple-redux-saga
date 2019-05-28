import actionTypes from '../actions/actionTypes'

const events = (state = [], action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVENTS:
      const {payload:{events}} = action
      if (!events) return state
      return events

    default:
      return state
  }
};

export default events;
