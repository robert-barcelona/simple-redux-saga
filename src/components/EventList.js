import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4'

import {getEvents, registerError} from '../actions/'

import EventTile from './EventTile'

class EventList extends Component {

  state = {
    gameID: '',
    provider: '',
    tpdID: '',
  }

  gameIDRef = React.createRef()
  providerRef = React.createRef()
  tpdIDRef = React.createRef()


  setGameID = e => {
    this.setState({gameID: e.target.value});
  }
  setProvider = e => {
    this.setState({provider: e.target.value});
  }
  setTpdID
    = e => {
    this.setState({tpdID: e.target.value});
  }


  render() {

    const {props: {events, error, registerError, getEvents}, state: {gameID, provider, tpdID}} = this

    return <Fragment>
      {error && <div className="notification is-warning">
        {error}
      </div>}
      <form

        onSubmit={
          async e => {
            e.preventDefault()
            try {
              if (gameID && provider && tpdID) {
                getEvents(gameID, provider, tpdID)
                this.setState({
                  gameID: '',
                  provider: '',
                  tpdID: '',
                })
                registerError('')
              } else registerError('Need to provide gameID, provider and tpdID')
            } catch (error) {
              registerError(error.message)
            }
          }
        }
      >
        <div className="field">
          <label className="label">Game ID</label>
          <div className="control">
            <input ref={this.gameIDRef} value={gameID} onChange={this.setGameID} className="input" type="text"
                   placeholder="Game ID"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Provider</label>
          <div className="control">
            <input ref={this.providerRef} value={provider} onChange={this.setProvider} className="input" type="text"
                   placeholder="Provider"/>
          </div>
        </div>
        <div className="field">
          <label className="label">TPD ID</label>
          <div className="control">
            <input ref={this.tpdIDRef} value={tpdID} onChange={this.setTpdID} className="input" type="text"
                   placeholder="TpD ID"/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>

        </div>
      </form>
      <ul>
        {events && events.map(event => <li key={uuidv4()}><EventTile theEvent={event}/></li>)}
      </ul>


    </Fragment>

  }

}

const mapStateToProps = (state) => {
  const {events, error} = state
  if (events) events.sort((a, b) => a.createdAt < b.createdAt ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0))
  return {error, events}
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: (gameID, provider, tpdID) => dispatch(getEvents(gameID, provider, tpdID)),
    registerError: (error) => dispatch(registerError(error))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
