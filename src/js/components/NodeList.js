import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as timeHelpers from '../utils/timeUtils';
import searchUtil from '../utils/searchUtils';

const ListNode = ({node}) => {
  return (
    <div>
      {node.name}
    </div>
  );
}

class NodeList extends Component {
  render() {
    const { nodelist, search } = this.props;
    var list = nodelist.nodes || [];

    if(nodelist.nodes && nodelist.nodes.length && !_.isEmpty(search)) {
      list = searchUtil(nodelist.nodes, search);
    } else {
      list = nodelist.nodes || [];
    }

    return(
      <div className="node-list">
        {list.map((node) => {
          return (<ListNode node={node} key={node.id} />)
        })}
      </div>
    );
  }
};
const mapStateToProps = state => {
  return {
    nodelist: state.nodelist,
    search: state.search
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // search: (e, value) => dispatch(search(value))
  }
}

export default connect(mapStateToProps)(NodeList);
