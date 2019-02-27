import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class DiveDetail extends Component {
  render() {
    let curId = this.props.match.params.id
    let curDive = this.props.dives.find(dive => dive._id === curId)

    if (!curDive) {
      return <div />
    }

    return (
      <div>
        <h2>{curDive.title}</h2>

        <h4>Description</h4>
        {curDive.description}

        <h4>Visibility</h4>
        {curDive.visibility}

        <h4>Depth</h4>
        {curDive.depth}

        <h4>Owner</h4>
        {curDive._owner.username}
      </div>
    )
  }
}
