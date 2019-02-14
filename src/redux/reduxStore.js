import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './../redux/rootReducer'

// localStorage
let initState = {}
const persistedState = localStorage.getItem('reduxState')
if (persistedState) {
  initState = JSON.parse(persistedState)
}
///localStorage

export const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(thunk)
  )