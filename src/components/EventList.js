import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBug } from '@fortawesome/free-solid-svg-icons';

import { getEvents, registerError } from '../actions';

import EventTile from './EventTile';
import Waiting from './Waiting';

class EventList extends Component {
  state = {
    gameID: '',
    provider: '',
    tpdID: '',
  };

  gameIDRef = React.createRef();

  providerRef = React.createRef();

  tpdIDRef = React.createRef();


  setGameID = (e) => {
    this.setState({ gameID: e.target.value });
  };

  setProvider = (e) => {
    this.setState({ provider: e.target.value });
  };

  setTpdID
    = (e) => {
    this.setState({ tpdID: e.target.value });
  };


  render() {
    const {
      props: {
        waiting, events, error, registerError, getEvents,
      }, state: { gameID, provider, tpdID },
    } = this;

    return (
      <Fragment>
        <div className="container">
          <div className='hero '>
            <div className='hero-body'><h1 className=' has-text-primary title'><FontAwesomeIcon
              icon={faCode} size='3x'/>Tilting Point Event
              Lister<FontAwesomeIcon icon={faBug} size='3x'/></h1>
            </div>
          </div>

          {error && (
            <div className="notification is-warning">
              {error}
            </div>
          )}
          <div className="columns">
            <div className="column is-one-third">
              {waiting && <Waiting loading={waiting}/>}

              {!waiting && (
                <form

                  onSubmit={
                    async (e) => {
                      e.preventDefault();
                      try {
                        if (gameID && provider && tpdID) {
                          getEvents(gameID, provider, tpdID);
                          this.setState({
                            gameID: '',
                            provider: '',
                            tpdID: '',
                          });
                        } else {
                          registerError('Need to provide gameID, provider and tpdID');
                        }
                      } catch (error) {
                        registerError(error.message);
                      }
                    }
                  }
                >
                  <div className="field">
                    <label className="label">Game ID</label>
                    <div className="control">
                      <input
                        ref={this.gameIDRef}
                        value={gameID}
                        onChange={this.setGameID}
                        className="input"
                        type="text"
                        placeholder="Game ID"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Provider</label>
                    <div className="control">
                      <input
                        ref={this.providerRef}
                        value={provider}
                        onChange={this.setProvider}
                        className="input"
                        type="text"
                        placeholder="Provider"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">TPD ID</label>
                    <div className="control">
                      <input
                        ref={this.tpdIDRef}
                        value={tpdID}
                        onChange={this.setTpdID}
                        className="input"
                        type="text"
                        placeholder="TpD ID"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>

                  </div>
                </form>
              )}
            </div>
            <div className="scrollableY column is-two-thirds">
              <ul>
                {events && events.map(event => (
                  <li key={uuidv4()}>
                    <EventTile theEvent={event}/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { events, error, waiting } = state;
  if (events) events.sort((a, b) => (a.createdAt < b.createdAt ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0)));
  return {
    waiting,
    error,
    events,
  };
};

const mapDispatchToProps = dispatch => ({
  getEvents: (gameID, provider, tpdID) => dispatch(getEvents(gameID, provider, tpdID)),
  registerError: error => dispatch(registerError(error)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
