import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


const Clock = (props) => (
    <span className={ props.className }>
      { props.clock.time }
    </span>
  );

const mapStateToProps = state => {
  return { clock: state.clock };
}

export default connect(mapStateToProps)(Clock);
