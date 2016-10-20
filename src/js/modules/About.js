import React from 'react'
import {connect} from 'react-redux';

const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const About = React.createClass({
    render() {
        return (
          <Counter
            onIncrement={ () => store.dispatch({type: 'INCREMENT'})}
            onDecrement={() => store.dispatch({type: 'DECREMENT'})}
          />
        );
    }
})

const mapStateToProps = (state) => {
  return { counter: state.counter }
}

export default connect(mapStateToProps)(About);
