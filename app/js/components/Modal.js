import React, { Component } from 'react';


class Modal extends Component {
  componentDidMount() {
    $(this.modal).modal({
      dismissable: true,
      complete: this.props.onClose
    });

    this.onModalOpen(this.props);
  }

  onModalOpen(nextProps) {
    if(nextProps.open === true) {
      $(this.modal).modal('open');
      Materialize.updateTextFields();
    }

    if(nextProps.timeout) {
      setTimeout(() => {
        $(this.modal).modal('close');
        nextProps.timeout.callback();
      }, nextProps.timeout.time || 5000);
    }
  }

  onModalClose() {
    const isValid = this.props.onBeforeClose();
    if(isValid) {
      this.handleModalClose();
    }
  }

  handleModalClose() {
    $(this.modal).modal('close');
  }

  render() {
    const {
      className,
      buttonName,
      cancelButton
    } = this.props;

    return (
      <div className={`modal ${className || ''}`} ref={(m) => { this.modal = m}}>
        {this.props.children}
        <div className="modal-footer right-align">
          <a onClick={this.onModalClose.bind(this)} className="btn btn-primary">{ buttonName || Close }</a>
          { cancelButton ? (
            <a onClick={this.handleModalClose.bind(this)} className="btn btn-flat">Cancel</a>
          ) : null}
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  onClose: () => {},
  onBeforeClose: () => { return true; }
}

export default Modal
