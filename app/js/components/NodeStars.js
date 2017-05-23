import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    const { stars } = props;

    if(!stars || _.isEmpty(stars) || _.isNaN(stars)) {
      return (<span></span>);
    }

    let starNodes = _.times(stars, function(i) {
      return (<i className="fa fa-star" key={i}></i>);
    });

    return (
      <span className="stars">
        { starNodes }
      </span>
    )
}

export default Stars
