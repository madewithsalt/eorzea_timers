import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  toggleModal
} from '../actions/pageActions';
import {
  addCustomNode
} from '../actions/customListActions';


class NewTimerModal extends Component {
  componentDidMount() {
    $(this.modal).modal({
      dismissable: false,
      complete: this.onModalClose.bind(this)
    });
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

  handleChange(name, evt) {
    let setting = {};
    const val = evt.target.value;

    setting[name] = val;

    this.setState(setting);
  }

  handleTimerSave(evt) {
    const {
      name,
      location,
      slot,
      level,
      x, y,
      time_hour,
      time_minute,
      meridien,
      dur_hours,
      dur_minutes,
      notes
    } = this.state;

    let result = {
      name,
      location,
      level: level || 70,
      slot,
      pos: `x${x} y${y}`,
      time: `${time_hour || 12}:${time_minute || '00'} ${meridien || 'AM'}`,
      duration: `${dur_hours || 0}:${dur_minutes || 55}`,
      notes
    };

    this.props.addCustomNode(result);
    this.toggleModal();
  }

  render() {
    const {
      toggleModal
    } = this.props;
    const {
      handleChange
    } = this;

    return (
      <div className="new-timer-container right-align">
        <a className="btn btn-default add-timer-btn" onClick={toggleModal}>
          <i className="material-icons">add</i> New Timer</a>
        <div className="modal modal-fixed-footer new-timer-modal left-align" ref={(modal) => { this.modal = modal; }}>
          <div className="modal-content">
            <form ref={(form) => {this.form = form; }}>
              <h3>New Timer</h3>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="name" defaultValue="My Custom Timer"
                    onChange={ handleChange.bind(this, 'name') } />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s12">
                  <input type="text" name="location" onChange={ handleChange.bind(this, 'location') }/>
                  <label htmlFor="location">Location</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5>Level, Slot, Position</h5>
                </div>
                <div className="input-field col s2">
                  <input type="number" name="level" onChange={ handleChange.bind(this, 'level') }/>
                  <label htmlFor="level">Level</label>
                </div>
                <div className="input-field col s4">
                  <input type="text" name="slot" onChange={ handleChange.bind(this, 'slot') }/>
                  <label htmlFor="slot">Slot</label>
                </div>
                <div className="col s6 position-fields">
                  <span className="">Position: </span>
                  <div className="input-field inline">
                    <input type="number" name="x" onChange={ handleChange.bind(this, 'x') } />
                    <label htmlFor="x">x</label>
                  </div>
                  <div className="input-field inline">
                    <input type="number" name="y" onChange={ handleChange.bind(this, 'y') } />
                    <label htmlFor="y">y</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5>Time</h5>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="time_hour" defaultValue="12"
                    onChange={ handleChange.bind(this, 'time_hour') }/>
                  <label htmlFor="time_hour">hour</label>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="time_minute" defaultValue="00"
                    onChange={ handleChange.bind(this, 'time_minute') } />
                  <label htmlFor="time_minute">minute</label>
                </div>
                <div className="input-field col s3">
                  <select name="meridien" id="" className="browser-default"
                    onChange={ handleChange.bind(this, 'meridien') }>
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5>Duration</h5>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="dur_hours" defaultValue="0"
                    onChange={ handleChange.bind(this, 'dur_hours') }/>
                  <label htmlFor="dur_hours">Hours</label>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="dur_minutes" defaultValue="55"
                    onChange={ handleChange.bind(this, 'dur_minutes') }/>
                  <label htmlFor="dur_minutes">Minutes</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 input-field">
                  <h5>Notes</h5>
                  <textarea className="materialize-textarea" name="notes" id="" cols="30" rows="10" onChange={ handleChange.bind(this, 'notes') } />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="right-align">
              <a onClick={this.handleTimerSave.bind(this)} className="btn btn-default">Save</a>
              <a onClick={this.handleToggleModal.bind(this)} className="btn btn-flat">Cancel</a>
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
    toggleModal: () => dispatch(toggleModal()),
    addCustomNode: (node) => dispatch(addCustomNode(node))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTimerModal);
