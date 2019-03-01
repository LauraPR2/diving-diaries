import React, { Component } from 'react';
import api from '../../api';
import Map from './Map'

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
        {this.state.dives.map(c => {
          console.log(c.location)
          return <li key={c._id}>
            <div>{c.title}</div>
            <img src={c.mainPicture} />
            <Map
              location={c.location}
              id={c._id}
              allowMovement={false}
              accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" />
          </li>
        }
        )}
      </div>
    )
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
