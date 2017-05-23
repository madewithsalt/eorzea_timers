import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import WatchListItem from '../modules/WatchListItem';

class WatchList extends Component {
  render() {
    const {
      watchlist,
      nodelist
    } = this.props;

    return (
      <div className="watchlist-container">
        <div className="row">
          { watchlist.map((id) => {
            const node = find(nodelist.nodes, { id });
            if(!node) { return; }
            return (
              <WatchListItem key={id} className="col s3" node={node} />
            )
          }) }
        </div>
      </div>
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
