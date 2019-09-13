/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dispatch } from 'redux';

import { initializeStore, initialState, RootState } from '../store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState: RootState): any {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export type RootStore = ReturnType<typeof getOrCreateStore>;

type Props = { reduxStore: RootStore };

const withReduxStore = (Component: React.ComponentClass<Props>): any => {
  return class Redux extends React.Component<Props> {
    private reduxStore: RootStore;

    static async getInitialProps(appContext): Promise<any> {
      const reduxStore = getOrCreateStore(initialState);

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if ((Component as any).getInitialProps) {
        appProps = await (Component as any).getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render(): React.ReactElement {
      return <Component {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;

export const mapDispatchToProps = (dispatch: Dispatch): { dispatch: Dispatch } => ({ dispatch });

export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps>;
