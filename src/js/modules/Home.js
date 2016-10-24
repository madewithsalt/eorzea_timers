import React from 'react'
import MainNav from '../components/MainNav';
import Clock from '../components/Clock';
import { changeTime } from '../actions/clockActions';
import {connect} from 'react-redux';

const Home = React.createClass({
  componentDidMount: function() {
    this.interval = setInterval(() => this.props.changeTime(), 1000);
  },
  render() {
    return (
      <div>
        <MainNav />
        <div className="jumbotron">
          <h1><Clock /></h1>
        </div>
      </div>
    )
  }
})

const mapStateToProps = state => {
  return { clock: state.clock };
}


const mapDispatchToProps = dispatch => {
  return {
    changeTime: (e) => dispatch(changeTime())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
