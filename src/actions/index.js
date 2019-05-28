import actionTypes from './actionTypes'

export const updateEvents = (events) => ({
  type: actionTypes.UPDATE_EVENTS,
  payload: {events},
})


export const getEvents = (gameID, provider, tpdID) => ({
  type: actionTypes.GET_EVENTS,
  payload: {gameID, provider, tpdID}
})


export const registerError = (error) => ({
  type: actionTypes.ERROR,
  payload: {error}
})
