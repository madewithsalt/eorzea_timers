import React, {Component} from 'react';
import NodeList from '../modules/NodeList';
import { search } from '../actions/searchActions';
import SearchBar from '../components/SearchBar';
import FilterMenu from '../components/FilterMenu';

import _ from 'lodash';

import {
  filterTypeNodeList,
  filterLevelNodeList,
  toggleFeatureFilter
} from '../actions/nodeListActions';
import { connect } from 'react-redux';


class Home extends Component {
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

  handleFilterChange(name, value) {
    const {
      typeFilter,
      levelFilter,
      featureFilter
    } = this.props;

    switch (name) {
      case 'type':
        typeFilter(value);
        break;

      case 'level':
        levelFilter(value);
        break;
      case 'feature':
        featureFilter(value)
        break;
    }

  }

  render() {
    const {
      search,
      availableFilters,
      filterByType,
      filterByLevel,
      featureFilters
    } = this.props;

    const filterValues = {
      type: filterByType,
      level: filterByLevel,
      feature: featureFilters
    }

    const { itemIcon, featureIcon, onSearchChange, handleFilterChange } = this;


    return (
      <div className="">
          <div className="row">
            <div className="col m12">
              <SearchBar onChange={ search } helpText={"Search by Name or Location"}/>
            </div>
            <FilterMenu className="node-list-filters" values={filterValues}
              onChange={handleFilterChange.bind(this)} filters={availableFilters} />
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
    featureFilters: state.nodelist.featureFilters,
    availableFilters: state.nodelist.filters
  };
}

const mapDispatchToProps = dispatch => {
  return {
    search: (e, value) => dispatch(search(value)),
    typeFilter: (value) => dispatch(filterTypeNodeList(value)),
    levelFilter: (value) => dispatch(filterLevelNodeList(value)),
    featureFilter: (value) => dispatch(toggleFeatureFilter(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
