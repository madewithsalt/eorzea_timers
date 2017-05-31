import React, {Component} from 'react';
import { isArray } from 'lodash';


class FilterMenu extends Component {

  constructor(props) {
    super(props);

    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(name, value) {
    let isActive = false;
    const { values } = this.props;

    if(values[name]) {
      if(isArray(values[name])) {
        isActive = values[name].indexOf(value) >= 0;
      } else {
        isActive = values[name] && values[name] === value;
      }
    }

    return (
      <li className="filter-menu-item" key={`filter-${name}-${value}`}>
        <a onClick={this.handleFilterChange.bind(this, name, value)}
            className={`menu-item ${isActive ? 'active' : ''}`}>
          <span className={`icon icon-${value}`}></span>
          <span className="name">{ value }</span>
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

  moo() {
    return (
      <div className="row">
        <div className="col m5">
          <div className="filter-menu">
                <span className="menu-label small">Filter by:</span>
                <ul className="menu-list" ref={(filters) => { this.filterMenuType = filters; }}>
                    { filters.type.map((item) => {
                      return (
                        <a key={ item } className={`chip menu-item ${item === filterByType ? 'active' : ''}`}
                            onClick={ _.bind(filter, this, item ) }>
                          { item !== 'all' ? itemIcon(item) : '' }
                          { _.capitalize(item) }
                        </a>
                      )
                    })}
                </ul>
            </div>
        </div>
        <div className="col m3">
          <div className="filter-menu">
              <span className="menu-label small">Level Range:</span>
              <div>
                { filters.level.map((level) => {
                  const isActive = filterByLevel &&  level === filterByLevel;
                  return (
                    <a key={ level } className={`chip menu-item ${isActive ? 'active' : ''}`}
                        onClick={ _.bind(levelFilter, this, level ) }>
                      { level }
                    </a>
                  )
                })}
              </div>
            </div>
        </div>
        <div className="col m4">
          <div className="filter-menu right-align">
                <span className="menu-label small">Node Types:</span>
                <div className="" ref={(filters) => { this.filterMenuFeature = filters; }}>
                  { filters.feature.map(function(item) {
                    return (
                      <a key={ item } className={`chip menu-item ${_.indexOf(featureFilters, item) >= 0 ? 'active' : ''}`}
                          onClick={ _.bind(filterFeature, this, item) }>
                        { featureIcon(item) }
                      </a>
                    )
                  })}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

FilterMenu.defaultProps = {
  onChange: () => {}
}

export default FilterMenu;
