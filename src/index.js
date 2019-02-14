import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Redux
import { Provider } from 'react-redux'
// import { createStore,applyMiddleware } from 'redux'
// import thunk from 'redux-thunk';
// import rootReducer from './redux/rootReducer'
import {store} from './redux/reduxStore'
///Redux
import * as serviceWorker from './serviceWorker';

// // localStorage
// let initState = {}
// const persistedState = localStorage.getItem('reduxState')
// if (persistedState) {
//   initState = JSON.parse(persistedState)
// }
// ///localStorage

const rootElement = document.getElementById('root');
// const store = createStore(
//   rootReducer,
//   initState,
//   applyMiddleware(thunk)
// )

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>
    , rootElement);

serviceWorker.unregister();
