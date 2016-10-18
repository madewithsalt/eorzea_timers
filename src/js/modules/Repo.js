import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <div>
          <h2>{this.props.params.repoName}</h2>
        </div>
      </div>
    )
  }
})
