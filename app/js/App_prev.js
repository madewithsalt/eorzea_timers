import React, { PropTypes, Component } from 'react';
import routes from './routes';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { recieveNodeList, requestNodeList } from './actions/nodeListActions';
import { changeTime } from './actions/clockActions';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
    componentDidMount() {
      const { recieveNodeList, requestNodeList, changeTime } = this.props;

      requestNodeList();

      fetch('/data/nodes.json')
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          recieveNodeList(json);
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });

        var interval = setInterval(() => changeTime(), 900);
    }

    componentWillUpdate(nextProps) {
      const { clock } = nextProps || this.props;
      document.title = clock.time + ' - Eorzea Timers';
    }

    render() {
        const { store, history, version } = this.props;
        return (
            <Provider store={store}>
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Router history={history} routes={routes} />
              </MuiThemeProvider>
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    clock: state.clock,
    nodelist: state.nodelist
  };
}

const mapDispatchToProps = dispatch => {
  return {
    recieveNodeList: (json) => dispatch(recieveNodeList(json)),
    requestNodeList: (e) => dispatch(requestNodeList()),
    changeTime: (e) => dispatch(changeTime())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
