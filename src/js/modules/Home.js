import React, {Component} from 'react'
import MainNav from '../components/MainNav';
import Clock from '../components/Clock';
import ListNode from '../components/ListNode';
import { changeTime } from '../actions/clockActions';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const { nodelist } = this.props;

    return (
      <div>
        <MainNav />
        { nodelist.isFetching ? 'Loading ...' : ''}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    clock: state.clock,
    nodelist: state.nodelist
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeTime: (e) => dispatch(changeTime())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
