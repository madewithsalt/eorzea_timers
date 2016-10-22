import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


const Clock = ({ clock }) => (
    <h1>
      { clock.time }
    </h1>
  );

const mapStateToProps = state => {
  return { clock: state.clock };
}

export default connect(mapStateToProps)(Clock);
