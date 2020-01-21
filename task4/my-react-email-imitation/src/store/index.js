import { mailReducer } from './mail';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';




const store = createStore(mailReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;