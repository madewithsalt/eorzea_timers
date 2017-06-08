import React, {Component} from 'react';
import { connect } from 'react-redux';

import TimerModal from '../components/TimerModal';

import {
  removeCustomNode,
} from '../actions/customListActions';

class CustomContent extends Component {
  handleOpenModal(id) {

  }

  handleRemoveNode(id) {
    this.props.removeCustomNode(id);
  }

  renderCustomNode(node) {
    return (
      <div className="custom-node-item clearfix" key={node.id}>
        <div className="left">
          <div className="name">{`${node.name} [${node.level}]`}</div>
          <div className="location">{`${node.time} ${node.location ? '--' + node.location : ''}`}</div>
          <div className="notes">{node.notes}</div>
        </div>
        <div className="right node-actions">
          <TimerModal timer={node} className="inline-block" />
          <a className="delete-btn" onClick={this.handleRemoveNode.bind(this, node.id)}><i className="material-icons">close</i></a>
        </div>
      </div>
    )
  }

  render() {
    const {
      customlist
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
              <p>No Custom Timers Yet!</p>
            </div>
          ) }
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
    removeCustomNode: (id) => dispatch(removeCustomNode(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomContent);
