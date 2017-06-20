import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  propTypes: {
    onChange: PropTypes.func.isRequired
  }

  onChangeEvent(onChange, evt) {
    onChange(evt, evt.target.value);
  }

  render() {
    const {
      onChange,
      defaultValue,
      helpText
    } = this.props;

    return (
      <div className="search-bar">
        <div className="input-field">
          <input type="text" id="search" defaultValue={defaultValue}
            onChange={this.onChangeEvent.bind(this, onChange)} />
          <label htmlFor="search">
            <i className="material-icons">search</i>
            Search
          </label>
        </div>
        { helpText ? (
          <p className="help-text">{ helpText }</p>
        ) : null }
      </div>
    );
  }
}

export default SearchBar;
