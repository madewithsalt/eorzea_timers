import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { connect } from 'react-redux';
import { find } from 'lodash';

import {
  toggleModal
} from '../actions/pageActions';
import {
  updateSetting
} from '../actions/settingsActions';
import sounds from '../static/sounds';

class SettingsModal extends Component {
  constructor(props) {
    super(props);

    this.onUpdateSetting = this.onUpdateSetting.bind(this);
  }

  componentDidMount() {
    $(this.modal).modal({
      dismissable: true,
      complete: this.onModalClose.bind(this)
    });

    $(this.select).on('change', (evt) => {
      this.onUpdateSetting('alarm_sound', evt);
    }).material_select();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.modal === true) {
      $(this.modal).modal('open');
    }
  }

  handleToggleModal() {
    $(this.modal).modal('close');
  }

  onModalClose() {
    this.props.toggleModal();
  }

  onUpdateSetting(name, evt) {
    let setting = {};
    const val = evt.target.value;

    switch (name) {
      case 'alarm_hour':
      case 'alarm_style':
      case 'alarm_sound':
        setting[name] = val;
        break;
      case 'no_alarm':
        setting[name] = evt.target.checked;
        break;
      default:
    }

    if(name === 'alarm_style' && val === 'desktop' && Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    this.props.updateSetting(setting)
  }

  render() {
    const {
      modal,
      toggleModal,
      className,
      settings
    } = this.props;
    const {
      onUpdateSetting
    } = this;

    let alarmSound;
    if(settings.alarm_sound && settings.alarm_sound !== 'none') {
      alarmSound = find(sounds, { name: settings.alarm_sound });
    }


    return (
      <div className={`settings-modal-container ${className}`}>
        <a onClick={toggleModal} className="toggle-btn btn btn-small btn-secondary">
          <i className="material-icons">settings</i>
          settings
        </a>
        <div className="modal modal-fixed-footer settings-modal" ref={(modal) => { this.modal = modal; }}>
          <div className="modal-content">
            <h3>Watch Settings</h3>
            <div className="row settings-group">
              <div className="col s12">
                <h4>Notification Time</h4>
              </div>
              <div className="col s8">
                <span>Eorzean Hours Notice: </span>
                <div className="input-field inline">
                  <input type="number" id="alarm_hour"
                    disabled={settings.no_alarm ? true : false}
                    defaultValue={settings.alarm_hour || 0}
                    onChange={ (evt) => { onUpdateSetting('alarm_hour', evt) } } />
                  <label htmlFor="alarm_hour">Hours Notice</label>
                </div>
              </div>
              <div className="input-field col s3">
                <input id="no_alarm" type="checkbox" value="no_alarm"
                  defaultChecked={settings.no_alarm || false }
                  onChange={ (evt) => { onUpdateSetting('no_alarm', evt) } } />
                <label htmlFor="no_alarm">None (disable)</label>
              </div>
            </div>
            <div className="row settings-group">
              <div className="col s12">
                <h4>Notice Style</h4>
              </div>
              <div className="input-radio-group clearfix">
                <div className="input-field col s4">
                  <input type="radio" name="alarm_style" id="alarm_style_1" value="none"
                    defaultChecked={settings.alarm_style === 'none'}
                    onChange={ (evt) => { onUpdateSetting('alarm_style', evt) } } />
                  <label htmlFor="alarm_style_1">None</label>
                </div>
                <div className="input-field col s4">
                  <input type="radio" name="alarm_style" id="alarm_style_2" value="popup"
                    defaultChecked={settings.alarm_style === 'popup'}
                    onChange={ (evt) => { onUpdateSetting('alarm_style', evt) } } />
                  <label htmlFor="alarm_style_2">In-Window Pop Up</label>
                </div>
                <div className="input-field col s4">
                  <input type="radio" name="alarm_style" id="alarm_style_3" value="desktop"
                    defaultChecked={settings.alarm_style === 'desktop'}
                    onChange={ (evt) => { onUpdateSetting('alarm_style', evt) } } />
                  <label htmlFor="alarm_style_3">Desktop Notification <br/>(needs permission)</label>
                </div>
              </div>
            </div>
            <div className="row settings-group">
              <div className="col s12">
                <h4>Alert Sound</h4>
              </div>
              <div className="input-field col s4">
                <select name="alarm_sound" id="alarm_sound" ref={(sel) => {this.select = sel; }}
                  defaultValue={settings.alarm_sound || 'none'}>
                  <option value="none" disabled>No Sound</option>
                  {sounds.map((sound) => {
                    return (
                      <option value={sound.name} key={sound.name}>{sound.name}</option>
                    )
                  })}
                </select>
                <label htmlFor="alarm_sound">Sound Effect</label>
              </div>
              <div className="col s4">
                <div className="sound-preview">
                  { alarmSound ? (
                    <ReactAudioPlayer src={`/sound/${alarmSound.filename}`} controls />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="right-align">
              <a onClick={this.handleToggleModal.bind(this)} className="btn btn-default">Done</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.page.modal,
    settings: state.settings
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(toggleModal()),
    updateSetting: (setting) => dispatch(updateSetting(setting))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
