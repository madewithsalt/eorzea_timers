import React, {Component} from 'react';
import { connect } from 'react-redux';

class WatchList extends Component {
  render() {
    return (
      <div>Hey Im a Watch List!</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nodelist: state.nodelist,
    watchlist: state.watchlist
  };
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
