import React, {Component} from 'react';
import { connect } from 'react-redux';

import TimerModal from '../components/TimerModal';
import WatchGroupModal from '../components/WatchGroupModal';

import {
  removeCustomNode,
} from '../actions/customListActions';
import {
  removeGroup
} from '../actions/watchGroupsActions';

class CustomContent extends Component {

  handleRemoveNode(id) {
    this.props.removeCustomNode(id);
  }

  handleRemoveGroup(id) {
    this.props.removeGroup(id);
  }

  renderCustomNode(node) {
    return (
      <div className="custom-node-item clearfix" key={node.id}>
        <div className="left">
          <div className="name">{`${node.name} [${node.level}]`}</div>
          <div className="meta">
            {`${node.time} ${node.location ? ' • ' + node.location : ''}`}
            { node.slot ? (
              <span className="slot">{` • slot ${node.slot}`}</span>
            ): null}
            { node.pos ? (
              <span className="pos">{` • ${node.pos}`}</span>
            ): null}
          </div>
          {node.notes ? (
            <div className="notes"><i>notes: </i><br />
              {node.notes}
            </div>
          ) : null}
        </div>
        <div className="right node-actions">
          <TimerModal timer={node} className="inline-block" />
          <a className="delete-btn" onClick={this.handleRemoveNode.bind(this, node.id)}><i className="material-icons">close</i></a>
        </div>
      </div>
    )
  }

  renderWatchGroup(group) {
    return (
      <div className="watch-group-item clearfix" key={group.id}>
        <div className="left">
          <h4>{group.name} • <small>{group.nodes.length} timers</small></h4>
        </div>
        <div className="right actions">
          <div className="right node-actions">
            <WatchGroupModal group={group} className="inline-block" />
            <a className="delete-btn" onClick={this.handleRemoveGroup.bind(this, group.id)}><i className="material-icons">close</i></a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      customlist,
      watchgroups
    } = this.props;

    return (
      <div className="custom-content-container">
        <div className="header"><TimerModal/></div>
        <div className="custom-node-list">
          <h3>Custom Timers</h3>
          { customlist.length ? (
              <div>
                { customlist.map((item) => {
                    return this.renderCustomNode(item);
                })}
              </div>
          ): (
            <div className="empty-list">
              <p>No Custom Timers Yet.</p>
            </div>
          ) }
        </div>
        <div className="watchgroup-list">
          <h3>Watch Groups</h3>
          { watchgroups.length ? (
            <div>
              { watchgroups.map((group) => {
                return this.renderWatchGroup(group);
              })}
            </div>
          ) : (
            <div className="empty-list">
              <p>No Watch Groups Created Yet.</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customlist: state.customlist,
    watchgroups: state.watchgroups
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCustomNode: (id) => dispatch(removeCustomNode(id)),
    removeGroup: (id) => dispatch(removeGroup(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomContent);
