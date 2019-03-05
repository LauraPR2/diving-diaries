import React, { Component } from 'react';
import api from '../../api';
import Map from './Map'
import { Container, Row, Col, Button } from 'reactstrap';
import Rating from './Rating';


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
        <Button>Edit</Button>

        <div> {this.state.dives.map(c => {
          return (
            <Container className="diveCard shadow" key={c._id}>
              <Row>
                <Col>
                  <h3>{c.title}</h3>
                </Col>
                <Col>
                  <Rating className="non-dec">{c.rating}</Rating>
                </Col>
                <Col>
                  <Button>Edit</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <li>Visibility: {c.visibility}m</li>
                  <li>Depth: {c.visibility}m</li>
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
              <img src={c.mainPicture} />
              <Button>View</Button>
            </Container>


          )
        }
        )}</div>
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
