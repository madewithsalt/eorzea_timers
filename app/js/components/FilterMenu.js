import React, {Component} from 'react';
import { isArray, isObject } from 'lodash';


class FilterMenu extends Component {

  constructor(props) {
    super(props);

    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(name, value) {
    let isActive = false;
    const object = isObject(value);
    const { values } = this.props;

    // if a filter is selected ...
    if(values[name]) {
      if(isArray(values[name])) {
        if(object) {
          if(isArray(value.value)) {
            isActive = values[name] === value.value;
          } else {
            isActive = values[name].indexOf(value.value) >= 0;
          }
        } else {
          isActive = values[name].indexOf(value) >= 0;
        }
      } else {
        if(object) {
          isActive = values[name] && values[name] === value.value;
        } else {
          isActive = values[name] && values[name] === value;
        }
      }
    }

    return (
      <li className="filter-menu-item" key={`filter-${name}-${object ? value.value : value}`}>
        <a onClick={this.handleFilterChange.bind(this, name, object ? value.value : value)}
            className={`menu-item ${isActive ? 'active' : ''}`}>
          <span className={`icon icon-${object ? value.value : value}`}></span>
          <span className="name">{ object ? value.name : value }</span>
        </a>
      </li>
    );
  }

  handleFilterChange(name, value) {
    this.props.onChange(name, value);
  }

  render() {
    const { filters, className } = this.props;
    const {
      renderMenuItem
    } = this;
    const keys = Object.keys(filters);

    return (
      <div className={`filter-menu ${className}`}>
        { keys.map((key) => {
          return (
            <div className={`filter-menu-group group-${key}`} key={key}>
              <span className="menu-label">{filters[key].name}:</span>
              <ul className="filter-menu-list">
                { filters[key].values.map((item) => {
                  return renderMenuItem(key, item);
                }) }
              </ul>
            </div>
          )
        }) }
      </div>
    );
  }
}

FilterMenu.defaultProps = {
  onChange: () => {}
}

export default FilterMenu;
