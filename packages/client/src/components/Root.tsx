import React from 'react';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { App, Loader } from 'components/';
import { createClient } from 'store/'
import 'styles/index.css';

interface RootState {
  loaded: boolean;
  client: ApolloClient<NormalizedCacheObject> | null;
}

class Root extends React.Component<{}, RootState> {
  state = {
    loaded: false,
    client: null,
  }

  async componentDidMount() {
    const client = await createClient();
    await (window as any).Stripe
    this.setState({ client })
  }

  componentDidUpdate(prevState: RootState) {
    if (prevState.client !== this.state.client) {
      if (this.state.client && !this.state.loaded) {
        this.setState({ loaded: true })
      }
    }
  }

  render() {
    const { loaded, client } = this.state;

    if (!loaded) {
      return <Loader />
    }

    return client !== null && loaded && (
      <ApolloProvider client={client}>
        <App {...this.state} />
      </ApolloProvider>
    )

  }
}


export { Root }