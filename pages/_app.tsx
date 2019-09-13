import NextApp from 'next/app';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import withReduxStore from '../src/util/with-redux-store';

interface AppProps {
  reduxStore: Store;
}

export default withReduxStore(
  class App extends NextApp<AppProps> {
    render(): ReactElement {
      const { Component, pageProps, reduxStore } = this.props;
      return (
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  },
);
