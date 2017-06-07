import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual, find } from 'lodash';

import ReactAudioPlayer from 'react-audio-player';
import Modal from '../components/Modal';

import sounds from '../static/sounds';
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
      this.setState({ active: true });
    } else if(style === 'desktop') {

      const single = list.length === 1,
            firstNode = list[0],
            title = single ? firstNode.name : `${firstNode.name} & ${list.length - 1} Others`;

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

  renderPopupContent() {
    return (
      <div className="popup-content-container">Moo</div>
    )
  }

  render() {
    const {
      active
    } = this.state;
    const {
      alarmSound,
      alarmStyle,
      closeNotification
    } = this.props;

    const hasSound = alarmSound && alarmSound !== 'none';
    let soundFile;

    if(hasSound) {
      soundFile = find(sounds, { name: alarmSound });
    }

    return (
      <div className="notification-container">
        { active ? (
          <div>
            { soundFile ? (
              <ReactAudioPlayer src={`/sound/${soundFile.filename}`} autoPlay className="" />
              ) : null}
            }
            { alarmStyle === 'popup' ? (
              <Modal open={active} timeout={{time: 5000, callback: closeNotification}}>
                {this.renderPopupContent()}
              </Modal>
            ) : null}
          </div>
        ) : null }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    alarmList: state.clock.alarm,
    alarmStyle: state.settings.alarm_style,
    alarmSound: state.settings.alarm_sound
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
