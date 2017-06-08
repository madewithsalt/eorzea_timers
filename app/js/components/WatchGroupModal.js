import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find, union, indexOf, isEmpty } from 'lodash';

import Modal from './Modal';
import {
  createGroup,
  updateGroup
} from '../actions/watchGroupsActions';

class WatchGroupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isNew: props.group ? false : true,
      nodes: props.group ? [...props.group.nodes] : [...props.watchlist],
      name: props.group ? props.group.name : null,
      id: props.group ? props.group.id : null
    }
  }

  handleOpenModal() {
    this.setState({ open: true });
  }

  handleCloseModal() {
    this.setState({ open: false });
  }

  handleChange(name, evt) {
    let setting = {};
    const val = evt.target.value;

    setting[name] = val;

    this.setState(setting);
  }

  handleRemoveNode(id) {
    let list = [...this.state.nodes];
    const existsAt = indexOf(list, id);

    list.splice(existsAt, 1);

    this.setState({ nodes: list });
  }

  handleOnSave() {
    const {
      name,
      nodes,
      id,
      isNew
    } = this.state;

    if(!nodes.length || isEmpty(name)) {
      return this.setState({error: 'You must have at least 1 node, and a name to save.'});
    }

    if(isNew) {
      this.props.createGroup({name, nodes});
    } else {
      this.props.updateGroup({name, nodes, id});
    }
    this.setState({ error: false, open: false });

    return true;
  }

  render() {
    const {
      className,
      nodelist,
      customlist,
      watchlist
    } = this.props;
    const {
      open,
      nodes,
      isNew,
      error
    } = this.state;

    const fullList = union(nodelist, customlist);

    return (
      <div className={`${className || ''}`}>
        {!isNew ? (
            <a className="edit-btn" onClick={this.handleOpenModal.bind(this)}><i className="material-icons">edit</i></a>
          ) : (
            <a onClick={this.handleOpenModal.bind(this)} className="btn btn-flat">Save List As ...</a>
        )}
        { open ? (
          <Modal open={open} buttonName="Save" className="modal-fixed-footer"
            onClose={this.handleCloseModal.bind(this)}
            onBeforeClose={this.handleOnSave.bind(this)} cancelButton>
            <div className="watch-group-create-container modal-content">
              { error ? (
                <p className="error-message">{error}</p>
              ): null}
              <div className="input-field">
                <input type="text" name="name" defaultValue={this.state.name}
                  onChange={this.handleChange.bind(this, 'name')}/>
                <label htmlFor="name">List Group Name:</label>
              </div>
              <h4>Timers:</h4>
              <div className="watch-items">
                {nodes.map((id) => {
                  const node = find(fullList, {id});
                  return node ? (
                    <div className="node-item clearfix" key={node.id}>
                      <div className="left">{node.name} {node.time}</div>
                      <div className="right">
                        <a className="delete-btn" onClick={this.handleRemoveNode.bind(this, node.id)}>
                          <i className="material-icons">close</i>
                        </a>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist.nodes,
    customlist: state.customlist,
    nodelist: state.nodelist.nodes
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (group) => dispatch(createGroup(group)),
    updateGroup: (group) => dispatch(updateGroup(group))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchGroupModal);
