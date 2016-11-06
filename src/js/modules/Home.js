import React, {Component} from 'react'
import MainNav from '../components/MainNav';
import NodeList from './NodeList';
import { search } from '../actions/searchActions';
import {
  filterTypeNodeList,
  toggleFeatureFilter
} from '../actions/nodeListActions';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
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
    const { itemIcon, featureIcon  } = this;

    const filterByType = nodelist.filterByType;
    const featureFilters = nodelist.featureFilters;

    return (
      <div>
        <MainNav />
        <div className="container-fluid">
          <div className="col-md-4">
            <TextField
              id="node-list-search"
              floatingLabelText={(
                <span><i className="fa fa-search" aria-hidden="true"></i> Search Nodes</span>
              )}
              onChange={ search }/>
          </div>
          <div className="col-md-4 clearfix">
              <div className="filter-menu pull-right text-left">
                  <span className="menu-label small">Filter by:</span>
                  <div className="btn-group">
                      { filters.type.map(function(item) {
                        return (
                          <a key={ item } className={`btn btn-default ${item === filterByType ? 'active' : ''}`}
                              onClick={ _.bind(filter, this, item ) }>
                            { item !== 'all' ? itemIcon(item) : '' }
                            { _.capitalize(item) }
                          </a>
                        )
                      })}
                  </div>
              </div>
          </div>
          <div className="col-md-4 clearfix">
              <div className="filter-menu pull-right text-left">
                  <span className="menu-label small">Node Types:</span>
                  <div className="btn-group">
                    { filters.feature.map(function(item) {
                      return (
                        <a key={ item } className={`btn btn-default ${_.indexOf(featureFilters, item) >= 0 ? 'active' : ''}`}
                            onClick={ _.bind(filterFeature, this, item) }>
                          { featureIcon(item) }
                        </a>
                      )
                    })}
                  </div>
              </div>
          </div>
          <NodeList />
        </div>
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
