import React, {Component} from 'react';
import NodeList from '../modules/NodeList';
import { search } from '../actions/searchActions';
import SearchBar from '../components/SearchBar';
import _ from 'lodash';

import {
  filterTypeNodeList,
  filterLevelNodeList,
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
        level: [
          50,
          60,
          70
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
    let content;
    switch(item) {
        case 'is_collectable':
          icon = 'icon-collectable';
          break;
        case 'is_ephemeral':
          icon = 'material-icons';
          content = 'book';
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
        <i className={`icon ${icon} icon-sm`}>{content}</i>
    )
  }

  render() {
    const {
      search,
      filterByType,
      filterByLevel,
      featureFilters,
      filter,
      levelFilter,
      filterFeature
    } = this.props;

    const { filters } = this.state;
    const { itemIcon, featureIcon, onSearchChange  } = this;


    return (
      <div className="">
          <div className="row">
            <div className="col m12">
              <SearchBar onChange={ search } helpText={"Search by Name or Location"}/>
            </div>
            <div className="row">
              <div className="col m5">
                <div className="filter-menu">
                      <span className="menu-label small">Filter by:</span>
                      <div className="" ref={(filters) => { this.filterMenuType = filters; }}>
                          { filters.type.map((item) => {
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
          </div>
          <NodeList />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    filterByType: state.nodelist.filterByType,
    filterByLevel: state.nodelist.filterByLevel,
    featureFilters: state.nodelist.featureFilters
  };
}

const mapDispatchToProps = dispatch => {
  return {
    search: (e, value) => dispatch(search(value)),
    filter: (value) => dispatch(filterTypeNodeList(value)),
    levelFilter: (value) => dispatch(filterLevelNodeList(value)),
    filterFeature: (value) => dispatch(toggleFeatureFilter(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
