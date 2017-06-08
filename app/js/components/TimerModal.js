import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  toggleModal
} from '../actions/pageActions';
import {
  addCustomNode,
  editCustomNode
} from '../actions/customListActions';


class NewTimerModal extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, {
      isNew: props.timer ? false : true,
      name: 'My Custom Timer',
      time_hour: '12',
      time_minute: '00',
      meridien: 'AM',
      dur_hours: '0',
      dur_minutes: '55'
    }, props.timer || {});

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleTimerSave = this.handleTimerSave.bind(this);
  }

  componentDidMount() {
    $(this.modal).modal({
      dismissable: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open === true) {
      $(this.modal).modal('open');
    }
  }

  handleOpenModal() {
    $(this.modal).modal('open');
  }

  handleCloseModal() {
    $(this.modal).modal('close');
  }

  handleChange(name, evt) {
    let setting = {};
    const val = evt.target.value;

    setting[name] = val;

    this.setState(setting);
  }

  handleTimerSave(evt) {
    const {
      isNew,
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

    let result = Object.assign({}, {
        name,
        location,
        slot,
        x, y,
        time_hour,
        time_minute,
        meridien,
        dur_hours,
        dur_minutes,
        notes
      }, {
        type: 'custom',
        level: level || 70,
        pos: x && y ? `x${x} y${y}` : null,
        time: `${time_hour || 12}:${time_minute || '00'} ${meridien || 'AM'}`,
        duration: `${dur_hours || 0}:${dur_minutes || 55}`,
      });

    if(isNew) {
      this.props.addCustomNode(result);
    } else {
      this.props.editCustomNode(result);
    }
    this.handleCloseModal();
  }

  render() {
    const {
      className
    } = this.props;
    const {
      handleChange,
      handleTimerSave,
      handleOpenModal,
      handleCloseModal
    } = this;

    const { isNew } = this.state;

    return (
      <div className={`timer-edit-container ${className || 'right-align'}`}>
        { !isNew ? (
            <a className="edit-btn" onClick={handleOpenModal}><i className="material-icons">edit</i></a>
          ) : (
            <a className="btn btn-default add-timer-btn" onClick={handleOpenModal}>
              <i className="material-icons">add</i>{ !isNew ? 'Edit' : 'New' } Timer</a>
        )}
        <div className="modal modal-fixed-footer new-timer-modal left-align" ref={(modal) => { this.modal = modal; }}>
          <div className="modal-content">
            <form ref={(form) => { this.form = form; }}>
              <h3>New Timer</h3>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="name" defaultValue={ this.state.name }
                    onChange={ handleChange.bind(this, 'name') } />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s12">
                  <input type="text" name="location" onChange={ handleChange.bind(this, 'location') }
                    defaultValue={ this.state.location } />
                  <label htmlFor="location">Location</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5>Level, Slot, Position</h5>
                </div>
                <div className="input-field col s2">
                  <input type="number" name="level"
                    defaultValue={this.state.level}
                    onChange={ handleChange.bind(this, 'level') }/>
                  <label htmlFor="level">Level</label>
                </div>
                <div className="input-field col s2">
                  <input type="text" name="slot" defaultValue={this.state.slot}
                    onChange={ handleChange.bind(this, 'slot') }/>
                  <label htmlFor="slot">Slot</label>
                </div>
                <div className="col s6 position-fields">
                  <span className="">Position: </span>
                  <div className="input-field inline">
                    <input type="number" name="x"
                      defaultValue={this.state.x}
                      onChange={ handleChange.bind(this, 'x') } />
                    <label htmlFor="x">x</label>
                  </div>
                  <div className="input-field inline">
                    <input type="number" name="y"
                      defaultValue={this.state.y}
                      onChange={ handleChange.bind(this, 'y') } />
                    <label htmlFor="y">y</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5>Time</h5>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="time_hour" defaultValue={this.state.time_hour}
                    onChange={ handleChange.bind(this, 'time_hour') }/>
                  <label htmlFor="time_hour">hour</label>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="time_minute" defaultValue={this.state.time_minute}
                    onChange={ handleChange.bind(this, 'time_minute') } />
                  <label htmlFor="time_minute">minute</label>
                </div>
                <div className="input-field col s3">
                  <select name="meridien" id="" className="browser-default"
                    defaultValue={this.state.meridien}
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
                  <input type="number" name="dur_hours" defaultValue={this.state.dur_hours}
                    onChange={ handleChange.bind(this, 'dur_hours') }/>
                  <label htmlFor="dur_hours">Hours</label>
                </div>
                <div className="input-field col s3">
                  <input type="number" name="dur_minutes" defaultValue={this.state.dur_minutes}
                    onChange={ handleChange.bind(this, 'dur_minutes') }/>
                  <label htmlFor="dur_minutes">Minutes</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 input-field">
                  <h5>Notes</h5>
                  <textarea className="materialize-textarea" name="notes" defaultValue={this.state.notes}
                    id="" cols="30" rows="10" onChange={ handleChange.bind(this, 'notes') } />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="right-align">
              <a onClick={handleTimerSave} className="btn btn-default">Save</a>
              <a onClick={handleCloseModal} className="btn btn-flat">Cancel</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addCustomNode: (node) => dispatch(addCustomNode(node)),
    editCustomNode: (node) => dispatch(editCustomNode(node))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTimerModal);
