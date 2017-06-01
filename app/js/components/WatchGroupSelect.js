import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isObject } from 'lodash';

class WatchGroupSelect extends Component {
  componentDidMount() {
    $(this.dropdown).dropdown();
  }

  handleDropdown() {
    $(this.dropdown).dropdown('open');
  }

  render() {
    const {
      options = [],
      className
    } = this.props;

    return (
      <div className={className}>
        <a className="btn btn-flat" ref={(a) => {this.dropdown = a;}}
          onClick={this.handleDropdown.bind(this)}
          data-activates="load-list">Load List</a>
        <ul name="load-list" id="load-list" className="dropdown-content">
          <li>Moo</li>
          {options.map((item) => {
            const obj = isObject(item)
            return (
              <li value={obj ? item.value : item}>{obj ? item.name : item}</li>
            )
          })}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(WatchGroupSelect);
