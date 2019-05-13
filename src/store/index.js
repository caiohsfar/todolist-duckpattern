import { combineReducers, createStore, applyMiddleware } from "redux";
import todo from './ducks/todo';
import thunk from 'redux-thunk';

export default createStore(combineReducers({
    todo
}), applyMiddleware(thunk) )