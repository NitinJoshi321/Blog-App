import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
// import thunk from 'redux-thunk'

const store = configureStore({
  reducer : userReducer
});

export default store;