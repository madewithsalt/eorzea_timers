import React, { PropTypes, Component } from 'react';
import routes from './routes';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

export default class App extends Component {
    render() {
        const { store, history, version } = this.props;
        return (
            <Provider store={store}>
              <Router history={history} routes={routes} />
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
