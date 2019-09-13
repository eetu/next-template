import { Action, AnyAction, Store } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { RootState } from '../store';

export type RootThunkAction<R> = ThunkAction<R, RootState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export type RootStore = Store<RootState, AnyAction> & {
  dispatch: RootThunkDispatch;
};
