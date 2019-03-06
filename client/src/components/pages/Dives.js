import React, { Component } from 'react';
import api from '../../api';
import Map from './Map'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Rating from './Rating';


var FontAwesome = require('react-fontawesome');


export default class Dives extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dives: [],
      depth: '',
    }

  }
  favouriteDive = (id) => {
    console.log(id)
    api.favouriteDive(id)
      .then(result => {
        this.setState({
          favourite: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteDive = (id) => {
    api.deleteDive(id)
      .then(result => {
        this.componentDidMount()
        console.log("Successful delete")
      })
      .catch(error => {
        console.log(error)
      })
  }

  clearFilter = () => {
    api.getDives()
      .then(dives => {
        console.log(dives)
        this.setState({
          dives: dives,
          depth: ''
        })
      })
      .catch(err => console.log(err))
  }

  filterbyRating = (num) => {
    api.getDives()
      .then(dives => {
        console.log(dives)
        this.setState({
          star: num,
          dives: dives.filter((dive) => {
            return dive.rating === num
          })
        })
      })
      .catch(err => console.log(err))
  }

  filterbyDepth = (event) => {
    const num = event.target.value
    this.setState({
      depth: num
    })
    api.getDives()
      .then(dives => {

        let filteredDives = []
        if (num == "") {
          filteredDives = dives
        } else {
          filteredDives = dives.filter((dive) => {
            return dive.depth == num
          })
        }
        this.setState({
          dives: filteredDives
        })
      })
      .catch(err => console.log(err))
  }

  filterbyDiveType = (event) => {
    const type = event.target.value
    api.getDives()
      .then(dives => {
        let filteredDives = []
        filteredDives = dives.filter((dive) => {
          return dive.diveType == type
        })
        this.setState({
          dives: filteredDives,
          star: 0,
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="Dives">
        <h2>List of dives</h2>
        <span>Filter by</span><Rating onUpdated={this.filterbyRating}>{this.state.star}</Rating>

        <Input type='number' value={this.state.depth} onChange={this.filterbyDepth} />
        <Input type='select' onChange={this.filterbyDiveType}>
          <option>All</option>
          <option>Apnea</option>
          <option>Scuba</option>
        </Input>
        <Button onClick={this.clearFilter}>clear</Button>

        <div> {this.state.dives.map(c => {
          return (
            <Container className="diveCard shadow" key={c._id}>
              <Row>
                {(c.favourite)
                  ? <Col>
                    <h3>{c.title}</h3><span><FontAwesome
                      onClick={() => this.favouriteDive(c._id)}
                      className="fa fa-heart" /></span>
                  </Col>
                  : <Col>
                    <h3>{c.title}</h3> <span><FontAwesome
                      onClick={() => this.favouriteDive(c._id)}
                      className="far fa-heart" /></span>
                  </Col>
                }

                <Col>
                  <Rating className="non-dec">{c.rating}</Rating>
                </Col>
                <Col>

                  <a onClick={() => this.deleteDive(c
                    ._id)}><FontAwesome className="fas fa-times" />
                  </a>

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
    api.getDives()
      .then(dives => {
        this.setState({
          dives: dives
        })
      })
      .catch(err => console.log(err))
  }
}
