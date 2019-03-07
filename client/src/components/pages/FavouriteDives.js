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
      <div className="dives">
        <div className="contentPage">
          <h2 className="pt-3 pb-3">Favourites</h2>

          <div> {this.state.dives.map(c => {
            return (
              <div className="tContainer diveCard shadow" key={c._id}>
                <div className="row">
                  <div className="col d-flex">
                    <h3 className="dark-grey"><strong>{c.title}</strong>   </h3>
                    <h3 className="midgreen"><Rating>{c.rating}</Rating></h3>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="tContainerRest col-9">
                    <div className="tInfo">
                      <span>{c.date}</span><br />
                      <span><strong>Type of dive: </strong>{c.diveType}</span><br />
                      <span><strong>Visibility: </strong>{c.visibility} m</span><br />
                      <span><strong>Depth: </strong>{c.depth} m</span><br />
                      <span><strong>Desription: </strong></span>
                    </div>
                    <div className="tDescription">
                      <p>{c.description}</p>
                    </div>
                    <div className="center tButton">
                      <button href={`/dive/${c._id}`} className="ui button">
                        View
                      </button>
                    </div>
                  </div>

                  <div className="tMap d-flex col-3">
                    <Map
                      location={c.location}
                      id={c._id}
                      allowMovement={false}
                      accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" />
                  </div>
                </div>

                {/* <Row>
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
            </Container> */}
              </div>
            )
          }
          )}</div>
        </div>
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
