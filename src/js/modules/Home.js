import React, {Component} from 'react'
import MainNav from '../components/MainNav';
import NodeList from '../components/NodeList';
import { search } from '../actions/searchActions';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }
  render() {
    const { search } = this.props;

    return (
      <div>
        <MainNav />
        <TextField
          id="node-list-search"
          floatingLabelText={(
            <span><i className="fa fa-search" aria-hidden="true"></i> Search Nodes</span>
          )}
          onChange={ search }/>
        <NodeList />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    nodelist: state.nodelist,
    search: state.search
  };
}

const mapDispatchToProps = dispatch => {
  return {
    search: (e, value) => dispatch(search(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
