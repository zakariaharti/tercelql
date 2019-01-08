import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import createImmutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
//import { createBrowserHistory } from 'history';
//import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';

const isProdMode = process.env.NODE_ENV === 'production';
//export const historyObj = createBrowserHistory();

export const configureStore = (preloadedState = {}) => {
  let middlewareArray = [
    thunk,
    //routerMiddleware(historyObj)
  ];

  if(!isProdMode){
    // @ts-ignore
    middlewareArray = [ createImmutableStateInvariantMiddleware(), thunk, logger];
  };

   const middlewareEnhancer = applyMiddleware(...middlewareArray);
   const composeEnhancers = composeWithDevTools(middlewareEnhancer);

   const store = createStore(rootReducer, preloadedState, composeEnhancers);

   // For hot reloading reducers
   // @ts-ignore
   if (module.hot) {
     // Enable Webpack hot module replacement for reducers
     // @ts-ignore
     module.hot.accept('./reducers', () => {
       const nextReducer = require('./reducers').default;
       store.replaceReducer(nextReducer);
     });
   }

   return store;
}
