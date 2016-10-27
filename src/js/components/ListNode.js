import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as timeHelpers from '../utils/timeUtils';

const ListNode = (props) => (
    <div className={ "list-node" + props.className }>
    </div>
  );

export default ListNode;
