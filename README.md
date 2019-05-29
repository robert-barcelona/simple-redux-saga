# Event Lister

A small app that calls a public API and lists a series of events.  It uses redux-saga to manage asynchronous API calls, redux for state management, and React for display.  Bulma is used for layout.

A proxy is used for development purposes.  If the app were to be deployed, this would be removed.

# Description

The app allows (requires) the user to enter the Game ID, the TPD ID, and the provider.  A series of events will be returned.  

Events that are not verified will have their title changed from turquoise to yellow.

Fields that are invalid will be highlighted in red and will have the reason for the invalidity displayed.

# Instructions

Load node modules

`yarn`

start the development server

`yarn start` 

The app will be served at http://localhost:3000

To build a production version

`yarn build` 
