import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { closeNotification } from '../actions/clockActions';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentWillUpdate(nextProps) {
    const { alarmList } = this.props;

    if(!isEqual(alarmList, nextProps.alarmList) && nextProps.alarmList.length) {
      this.handleNotifications(nextProps);
    }
  }

  handleNotifications(props) {
    if(this.state.active) { return; }

    const list = props.alarmList,
          style = props.alarmStyle;

    if(style === 'popup') {
      this.setState({ popup: true, active: true });

      return setTimeout(() => {
        this.setState({ popup: false, active: false });
        props.closeNotification();
      }, 5000);
    }

    if(style === 'desktop') {
      const single = list.length === 1,
            firstNode = list[0],
            title = single ? firstNode.name : `${list.length} Nodes Active`;

      let options = {};
      if(firstNode.type === 'botany') {
        options.icon = '/img/btn_icon_lg.png';
      } else {
        options.icon = '/img/min_icon_lg.png';
      }

      this.setState({ active: true });
      const notification = new Notification(title, options);

      return setTimeout(() => {
        this.setState({ active: false });
        props.closeNotification();
      }, 5000);
    }


  }

  render() {
    const {
      popup
    } = this.state;

    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    alarmList: state.clock.alarm,
    alarmStyle: state.settings.alarm_style
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
