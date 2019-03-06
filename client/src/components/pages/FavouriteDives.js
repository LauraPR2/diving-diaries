import React, { Component } from 'react';
import api from '../../api';
import Map from './Map'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Rating from './Rating';


var FontAwesome = require('react-fontawesome');


export default class FavouriteDives extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dives: [],
      depth: '',
    }

  }



  render() {
    return (
      <div className="Dives">
        <h2>List of dives</h2>

        <div> {this.state.dives.map(c => {
          return (
            <Container className="diveCard shadow" key={c._id}>
              <Row>

                <Col>
                  <Rating className="non-dec">{c.rating}</Rating>
                </Col>
              </Row>
              <Row>
                <Col>
                  <li>Type of dive: {c.diveType}</li>
                  <li>Visibility: {c.visibility}m</li>
                  <li>Depth: {c.depth}m</li>
                  <p>{c.description}</p>

                </Col>
                <Col>
                  <Map
                    className="sMap"
                    location={c.location}
                    id={c._id}
                    allowMovement={false}
                    accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" />
                </Col>
              </Row>
              <Button href={`/dive/${c._id}`}>View</Button>
            </Container>

          )
        }
        )}</div>
      </div >
    )
  }
  componentDidMount() {
    api.getDivesbyFavourite()
      .then(dives => {
        console.log(dives)
        this.setState({
          dives: dives
        })
      })
      .catch(err => console.log(err))
  }
}
