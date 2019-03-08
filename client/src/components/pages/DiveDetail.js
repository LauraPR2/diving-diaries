import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {
  Container, Input, Button
} from 'reactstrap'
import api from '../../api';
import Map from './Map';
import Rating from './Rating';

export default class DiveDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dive: {},
      editing: false,
    }
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

  save = () => {
    api.editDive(this.props.match.params.id, this.state.dive)
      .then(result => {
        console.log("Successful edit of dive")
        this.setState({
          editing: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  startEditing = () => {
    this.setState({
      editing: true
    })
  }
  cancel = () => {
    this.setState({
      editing: false
    })
    this.componentDidMount()
  }

  changeDive = (event) => {
    var updatedDive = this.state.dive
    updatedDive[event.target.name] = event.target.value
    this.setState({
      dive: updatedDive
    })
  }

  render() {

    console.log(this.state.dive)

    return (
      <div className="dives">
        <div className="contentPage">
          <div className="diveCard">
            <div className="row">
              <div className="col d-flex">
                <h2 className="gray">{this.state.dive.title}</h2>

                <h3 className="midgreen"><Rating>{this.state.dive.rating}</Rating></h3>
              </div>

              <div className="ticons col d-flex">
                {(this.state.editing)
                  ?
                  <div>
                    <div onClick={this.save} className="ui animated button" tabIndex="0">
                      <div className="visible content">Save</div>
                      <div className="hidden content">
                        <i className="save outline icon"></i></div>
                    </div>

                    <div onClick={this.cancel} className="ui animated button" tabIndex="0">
                      <div className="visible content">Cancel</div>
                      <div className="hidden content">
                        <i className="close icon"></i></div>
                    </div>
                  </div>

                  :
                  <div>
                    <div onClick={this.startEditing} className="ui animated button" tabIndex="0">
                      <div className="visible content">Edit</div>
                      <div className="hidden content">
                        <i className="edit outline icon"></i></div>
                    </div>
                  </div>

                  // ?
                  // <span><Button onClick={this.save}>Save</Button>
                  //   <Button onClick={this.save}>Cancel</Button></span>

                  // : <span><Button onClick={this.startEditing}>Edit</Button></span>
                }
              </div>
            </div>
            <div className="row p-2">
              <div className="tContainerRest col-9">
                <h3 className="dark-grey">Details</h3>
                <div className="tInfo">
                  <div>
                    {(this.state.editing)
                      ? <Input type="date" id="date" onChange={this.changeDive} value={this.state.dive.date} name="date" />
                      : <span className="gray">{this.formatDate(new Date(this.state.dive.date))}</span>
                    }
                  </div>

                  <div>
                    <span className="dark-grey"><strong>How did I dive?</strong></span><br />
                    {(this.state.editing)
                      ? <Input type="text" id="diveType" onChange={this.changeDive} value={this.state.dive.diveType} name="diveType" />
                      : <span className="gray">{this.state.dive.diveType}</span>
                    }
                  </div>



                  <div><span className="dark-grey"><strong>Visibility:</strong></span><br />
                    {(this.state.editing)
                      ? <Input type="number" id="visibility" onChange={this.changeDive} value={this.state.dive.visibility} name="visibility" />
                      : <span className="gray">{this.state.dive.visibility}m</span>
                    }
                  </div>

                  <div><span className="dark-grey"><strong>Depth:</strong></span><br />
                    {(this.state.editing)
                      ? <Input type="number" id="depth" onChange={this.changeDive} value={this.state.dive.depth} name="depth" />
                      : <span className="gray">{this.state.dive.depth}m</span>
                    }
                  </div>
                  <div><span className="dark-grey"><strong>Description:</strong></span><br />
                    {(this.state.editing)
                      ? <Input type="textarea" id="description" onChange={this.changeDive} value={this.state.dive.description} name="description" />
                      : <span className="gray">{this.state.dive.description}</span>
                    }
                  </div>
                </div>
              </div>
              <div className="tMap center d-flex col-3">
                <Map className="sMap"
                  location={this.state.dive.location}
                  id={this.state.dive._id}
                  allowMovement={false}
                  accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" />
              </div>
            </div>
          </div>
          <div className="diveCard">
            <h3>Pictures</h3>
            <div className=" picturesdiv flex">
              {this.state.dive.pictures && this.state.dive.pictures.map(c => {
                return (
                  (c)
                    ? <div><img className="shadow picture" src={c} /></div>
                    : <div></div>
                )

              })}
            </div>
          </div>

          {console.log(this.state.dive.pictures)}
        </div>
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

