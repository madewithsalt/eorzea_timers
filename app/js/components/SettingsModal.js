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
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.modal === true) {
      $(this.modal).modal('open');
    }
  }

  onModalClose() {
    this.props.toggleModal();
  }

  render() {
    const {
      modal,
      toggleModal
    } = this.props;

    return (
      <div>
        <a onClick={toggleModal} className="btn btn-small btn-secondary">
          <i className="material-icons">settings</i>
          settings
        </a>
        <div className="modal" ref={(modal) => { this.modal = modal; }}>
          <div className="modal-content">
            Settings Modal
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
