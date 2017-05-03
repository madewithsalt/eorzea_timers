import React, { PropTypes, Component } from 'react';
import { Provider, connect } from 'react-redux';
import Router from './routes';

import { recieveNodeList, requestNodeList } from './actions/nodeListActions';
import { changeTime } from './actions/clockActions';

class App extends Component {
  propTypes: {
    store: PropTypes.object.isRequired
  }

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

      var interval = setInterval(() => changeTime(), 3000);
  }

  componentWillUpdate(nextProps) {
    const { clock } = nextProps || this.props;
    document.title = clock.time + ' - Eorzea Timers';
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
          <Router />
      </Provider>
    )
  }

}

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
