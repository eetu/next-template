import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { chainReducers, createAction, onAction, withInitialState } from 'redux-preboiled';
import thunkMiddleware from 'redux-thunk';

import { RootStore, RootThunkDispatch } from '../types/data-types';
import { timeout } from '../util/timeout';

export type User = {
  firstName: string;
  lastName: string;
};

export type RootState = {
  user?: User;
  loginInProgress: boolean;
};

export const initialState: RootState = { loginInProgress: false };

const loginAction = createAction('login');
const loginSuccessAction = createAction('login/login-success').withPayload<User>();

const reducer = chainReducers(
  withInitialState(initialState),
  onAction(loginAction, state => ({
    ...state,
    loginInProgress: true,
  })),
  onAction(loginSuccessAction, (state, action) => ({
    ...state,
    user: {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
    },
    loginInProgress: false,
  })),
);

export const initializeStore = (initialState: RootState): RootStore => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};

export const login = () => async (dispatch: RootThunkDispatch): Promise<void> => {
  dispatch(loginAction());
  await timeout(1000);
  dispatch(loginSuccessAction({ firstName: 'John', lastName: 'Doe' }));
};
