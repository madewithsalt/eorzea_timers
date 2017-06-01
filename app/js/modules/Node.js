import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  isActive,
  getTimeDifference,
  getEarthDurationfromEorzean,
  getDurationStringFromObject,
  getEarthTimeRemaining
} from '../utils/timeUtils';

class Node extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${this.props.className}`}>
        {this.props.children}
      </div>
    )
  }
}

  export default Node;
