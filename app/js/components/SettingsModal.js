import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  toggleModal
} from '../actions/pageActions';

class SettingsModal extends Component {
  componentDidMount() {
    $(this.modal).modal({
      dismissable: true,
      complete: this.onModalClose.bind(this)
    });

    $(this.select).material_select();
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

  render() {
    const {
      modal,
      toggleModal,
      className
    } = this.props;

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
              <div className="input-field col s3">
                <input id="no_alarm" type="checkbox" value="no_alarm" />
                <label htmlFor="no_alarm">None (disable)</label>
              </div>
              <div className="col s8">
                <span>Eorzean Hours Notice: </span>
                <div className="input-field inline">
                  <input type="number" id="alarm_hour" />
                  <label htmlFor="alarm_hour">Hours Notice</label>
                </div>
              </div>
            </div>
            <div className="row settings-group">
              <div className="col s12">
                <h4>Notice Style</h4>
              </div>
              <div className="input-radio-group clearfix">
                <div className="input-field col s4">
                  <input type="radio" name="alarm_style" id="alarm_style_1" value="none" />
                  <label htmlFor="alarm_style_1">None</label>
                </div>
                <div className="input-field col s4">
                  <input type="radio" name="alarm_style" id="alarm_style_2" value="popup" />
                  <label htmlFor="alarm_style_2">In-Window Pop Up</label>
                </div>
                <div className="input-field col s4">
                  <input type="radio" name="alarm_style" id="alarm_style_3" value="desktop" />
                  <label htmlFor="alarm_style_3">Desktop Notification <br/>(needs permission)</label>
                </div>
              </div>
            </div>
            <div className="row settings-group">
              <div className="col s12">
                <h4>Alert Sound</h4>
              </div>
              <div className="input-field col s4">
                <select name="alarm-sound" id="alarm-sound" ref={(sel) => {this.select = sel; }} defaultValue="none">
                  <option value="none" disabled>No Sound</option>
                </select>
                <label htmlFor="alarm-sound">Sound Effect</label>
              </div>
              <div className="col s4">
                <div className="sound-preview">
                  <i className="material-icons play">play_arrow</i>
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
    modal: state.page.modal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(toggleModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
