import React, { Component } from 'react';
import api from '../../api';
import Map from './Map'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';



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
        this.componentDidMount()
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

  formatDate = (date) => {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return (day + ' ' + monthNames[monthIndex] + ' ' + year)
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
    const numberPerPage = 5
    const currentPage = parseInt(this.props.match.params.page)
    const totalPages = Math.ceil(this.state.dives.length / numberPerPage)
    const dives = this.state.dives.slice(currentPage * numberPerPage, (currentPage * numberPerPage) + numberPerPage)

    return (
      <div className="dives">
        <div className="contentPage">
          <div className="topFilter mb-5">
            <h2 className="dark-grey">My Dives</h2>
            <div className="row">
              <div className="col-1 d-flex aligning tcons">
                <span className="filter"><p>Filter by:</p></span>
              </div>
              <div className="col-1 aligning d-flex">
                <span className="filter">Rating: </span>
                <Rating className="filter" onUpdated={this.filterbyRating}>{this.state.star}</Rating>
              </div>
              <div className="col-2 ml-5 d-flex aligning">
                <span className="filter">Depth: </span>
                <Input type='number' value={this.state.depth} onChange={this.filterbyDepth} />
              </div>
              <div className="col-2 d-flex aligning">
                <span className="filter">Sport: </span>
                <Input type='select' onChange={this.filterbyDiveType}>
                  <option>All</option>
                  <option>Apnea</option>
                  <option>Scuba</option>
                </Input>
              </div>
              <div className="col-1">
                <button className="ui button" onClick={this.clearFilter}>Clear</button>
              </div>
            </div>

          </div>
          <div className=""> {dives.map(c => {
            return (

              /* Starting here */


              <div className="tContainer diveCard shadow" key={c._id}>
                <div className="row">
                  <div className="col d-flex">
                    <h3 className="dark-grey"><strong>{c.title}</strong>   </h3>
                    <h3 className="midgreen"><Rating>{c.rating}</Rating></h3>
                  </div>
                  <div className="ticons col d-flex">
                    {(!c.favourite)
                      ? <div>
                        <h3>
                          <i onClick={() => this.favouriteDive(c._id)} className="heart red outline icon" />
                        </h3>
                      </div>
                      : <div>
                        <h3>
                          <i onClick={() => this.favouriteDive(c._id)} className="heart red icon" />
                        </h3>
                      </div>}

                    <h3>
                      <a onClick={() => this.deleteDive(c
                        ._id)}>
                        <i className="trash alternate outline icon"></i>
                      </a>
                    </h3>

                  </div>
                </div>

                <div className="row p-2">
                  <div className="tContainerRest col-9">
                    <div className="tInfo">
                      <span>{this.formatDate(new Date(c.date))}</span><br />
                      <span><strong>How did I dive? </strong>{c.diveType}</span><br />
                      <span><strong>Visibility: </strong>{c.visibility} m</span><br />
                      <span><strong>Depth: </strong>{c.depth} m</span><br />
                      <span><strong>Desription: </strong></span>
                    </div>
                    <div className="tDescription">
                      <p>{c.description}</p>
                    </div>
                    <div className="center tButton">

                      <button className="ui button">
                        <a href={`/dive/${c._id}`}>View</a>
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

              </div>

              /* Ending here */



            )
          }
          )}</div>
          <div className="row center">
            {currentPage - 1 >= 0
              ? <Link className='btn' to={"/dives/" + (currentPage - 1)}><h3><i class="arrow  light-gray alternate circle left icon"></i></h3></Link>
              : <div></div>
            }
            {currentPage + 1 < totalPages
              ? <Link className='btn' to={"/dives/" + (currentPage + 1)}><h3><i class="arrow  light-gray alternate circle right icon"></i></h3></Link>
              : <div></div>
            }
          </div>
        </div>
      </div>
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
