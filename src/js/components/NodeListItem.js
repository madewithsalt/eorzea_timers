import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as timeHelpers from '../utils/timeUtils';


const NodeListItem = ({node}) => {
  return (
    <div className="node-list-item">
      {node.name}
    </div>
  );
}


export default NodeListItem;
