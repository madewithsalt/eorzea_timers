import React, {Component} from 'react'
import MainNav from '../components/MainNav';
import NodeList from './NodeList';
import { search } from '../actions/searchActions';
import { filterNodeList } from '../actions/nodeListActions';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  itemIcon(item) {
    return <i className={`icon icon-${item} icon-xs`}></i>
  }

  render() {
    const { search, nodelist, filter } = this.props;
    const filterBy = nodelist.filterBy;
    const itemIcon = this.itemIcon;
    const filters = [
        'all',
        'botany',
        'mining',
        'fishing'
    ];

    return (
      <div>
        <MainNav />
        <div className="container-fluid">
          <div className="col-md-6">
            <TextField
              id="node-list-search"
              floatingLabelText={(
                <span><i className="fa fa-search" aria-hidden="true"></i> Search Nodes</span>
              )}
              onChange={ search }/>
          </div>
          <div className="col-md-6 clearfix">
            <div className="filter-menu pull-right text-left">
              <span className="menu-label small">Filter by:</span>
              <div className="btn-group">
                  { filters.map(function(item) {
                    return (
                      <a key={ item } className={`btn btn-default ${item === filterBy ? 'active' : ''}`} onClick={ _.bind(filter, this, item) }>
                        { item !== 'all' ? itemIcon(item) : '' }
                        { _.capitalize(item) }
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
    filter: (value) => dispatch(filterNodeList(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
