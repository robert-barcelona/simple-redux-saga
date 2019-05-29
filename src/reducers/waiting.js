import actionTypes from '../actions/actionTypes'

const error = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_WAITING:
      return true

    case actionTypes.CLEAR_WAITING:
      return false

    default:
      return state
  }
};

export default error;
