import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import api from '../../api';

export default class DiveDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dive: {}
    }

  }
  render() {

    return (
      <div>
        <h2>{this.state.dive.title}</h2>

        <h4>Description</h4>
        {this.state.dive.description}

        <h4>Visibility</h4>
        {this.state.dive.visibility}

        <h4>Depth</h4>
        {this.state.dive.depth}
      </div>
    )
  }
  componentDidMount() {
    console.log(this.props.match.params.id)
    api.getDive(this.props.match.params.id)
      .then(dive => {
        console.log(dive)
        this.setState({
          dive: dive
        })
      })
      .catch(err => console.log(err))
  }
}

