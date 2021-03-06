import actionTypes from '../actions/actionTypes'

const error = (state = '', action) => {
  switch (action.type) {
    case actionTypes.ERROR:
    case actionTypes.CLEAR_ERROR:
      const {payload: {error}} = action
      return error


    default:
      return state
  }
};

export default error;
