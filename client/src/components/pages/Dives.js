import React, { Component } from 'react';
import api from '../../api';

export default class Dives extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dives: []
    }
  }
  render() {
    return (
      <div className="Dives">
        <h2>List of dives</h2>
        {this.state.dives.map(c => <li key={c._id}>{c.title}</li>)}
      </div>
    );
  }
  componentDidMount() {
    api.getDives()
      .then(dives => {
        console.log(dives)
        this.setState({
          dives: dives
        })
      })
      .catch(err => console.log(err))
  }
}
