import React, {Component} from 'react';
import NodeList from '../modules/NodeList';
import { search } from '../actions/searchActions';
import SearchBar from '../components/SearchBar';

import {
  filterTypeNodeList,
  toggleFeatureFilter
} from '../actions/nodeListActions';
import { connect } from 'react-redux';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        type: [
            'all',
            'botany',
            'mining',
            'fishing'
        ],
        feature: [
          'is_collectable',
          'is_ephemeral',
          'red_scrip',
          'blue_scrip'
        ]
      }
    }
  }

  componentDidMount() {
    $(this.tabMenu).tabs();
  }

  itemIcon(item) {
    return <i className={`icon icon-${item} icon-xs`}></i>
  }

  featureIcon(item) {
    let icon;
    switch(item) {
        case 'is_collectable':
          icon = 'icon-collectable';
          break;
        case 'is_ephemeral':
          icon = 'fa fa-book';
          break;
        case 'red_scrip':
          icon = 'icon-red-scrip';
          break;
        case 'blue_scrip':
          icon = 'icon-blue-scrip';
          break;
        default:
          break;
    }

    return (
        <i className={`icon ${icon} icon-sm`}></i>
    )
  }

  render() {
    const { search, nodelist, filter, filterFeature } = this.props;
    const { filters } = this.state;
    const { itemIcon, featureIcon, onSearchChange  } = this;

    const filterByType = nodelist.filterByType;
    const featureFilters = nodelist.featureFilters;

    return (
      <div className="">
          <div className="row">
            <div className="col m12">
              <SearchBar onChange={ search } helpText={"Search by Name or Location"}/>
            </div>
            <div className="row">
              <div className="col m6">
                  <div className="filter-menu">
                      <span className="menu-label small">Filter by:</span>
                      <div className="" ref={(filters) => { this.filterMenuType = filters; }}>
                          { filters.type.map(function(item) {
                            return (
                              <a key={ item } className={`chip menu-item ${item === filterByType ? 'active' : ''}`}
                                  onClick={ _.bind(filter, this, item ) }>
                                { item !== 'all' ? itemIcon(item) : '' }
                                { _.capitalize(item) }
                              </a>
                            )
                          })}
                      </div>
                  </div>
              </div>
              <div className="col m6">
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
          </div>
          <NodeList />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    nodelist: state.nodelist
  };
}

const mapDispatchToProps = dispatch => {
  return {
    search: (e, value) => dispatch(search(value)),
    filter: (value) => dispatch(filterTypeNodeList(value)),
    filterFeature: (value) => dispatch(toggleFeatureFilter(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
