import React, { Component } from 'react';


class Modal extends Component {
  componentDidMount() {
    $(this.modal).modal({
      dismissable: true,
      complete: this.onModalClose.bind(this)
    });

    this.onModalOpen(this.props);
  }

  onModalOpen(nextProps) {
    if(nextProps.open === true) {
      $(this.modal).modal('open');
    }

    if(nextProps.timeout) {
      setTimeout(() => {
        $(this.modal).modal('close');
        nextProps.timeout.callback();
      }, nextProps.timeout.time || 5000);
    }
  }

  onModalClose() {
    this.props.onClose();
  }

  handleToggleModal() {
    $(this.modal).modal('close');
  }

  render() {
    const {
      className
    } = this.props;

    return (
      <div className={`modal ${className || ''}`} ref={(m) => { this.modal = m}}>
        {this.props.children}
        <div className="modal-footer right-align">
          { this.props.buttons }
          <a onClick={this.handleToggleModal.bind(this)} className="btn btn-flat">Close</a>
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  onClose: () => {}
}

export default Modal
