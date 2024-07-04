import { combineReducers } from '@reduxjs/toolkit';
import confirmMessageReducer from '~/features/confirmMessage/confirmMessageSlice';
import registrationReducer from '~/features/registration/registrationSlice';

const rootReducer = combineReducers({
  confirmMessage: confirmMessageReducer,
  registrations: registrationReducer
});

export default rootReducer;
