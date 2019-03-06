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
      <Container className="DiveDetails">
        <h2>{this.state.dive.title}</h2>
        {(this.state.editing)
          ?
          <span><Button onClick={this.save}>Save</Button>
            <Button onClick={this.save}>Cancel</Button></span>

          : <span><Button onClick={this.startEditing}>Edit</Button></span>
        }
        <h3>Details</h3>

        <div>How did I dive?
        {(this.state.editing)
            ? <Input type="text" id="diveType" onChange={this.changeDive} value={this.state.dive.diveType} name="diveType" />
            : <span>{this.state.dive.diveType}</span>
          }
        </div>

        <div>Date:
        {(this.state.editing)
            ? <Input type="date" id="date" onChange={this.changeDive} value={this.state.dive.date} name="date" />
            : <span>{this.state.dive.date}</span>
          }
        </div>

        <div>Rating:
        {(this.state.editing)
            ? <Rating onUpdated={this.updateRating}>
              {this.state.rating}
            </Rating>
            : <Rating className="non-dec">{this.state.dive.rating}</Rating>
          }
        </div>

        <div>Visibility:
        {(this.state.editing)
            ? <Input type="number" id="visibility" onChange={this.changeDive} value={this.state.dive.visibility} name="visibility" />
            : <span>{this.state.dive.visibility}</span>
          }
        </div>

        <div>Depth:
        {(this.state.editing)
            ? <Input type="number" id="depth" onChange={this.changeDive} value={this.state.dive.depth} name="depth" />
            : <span>{this.state.dive.depth}</span>
          }
        </div>
        <div>Description:
        {(this.state.editing)
            ? <Input type="textarea" id="description" onChange={this.changeDive} value={this.state.dive.description} name="description" />
            : <span>{this.state.dive.description}</span>
          }
        </div>

        <Map className="sMap"
          location={this.state.dive.location}
          id={this.state.dive._id}
          allowMovement={false}
          accessToken="pk.eyJ1IjoibGF1cmFwcjIiLCJhIjoiY2pydDhkNDVrMHFheTN5bXFsZnY0azNnMiJ9.07FzAj0enFs4Z4GP0chyvA" />


        {this.state.dive.pictures && this.state.dive.pictures.map(c => {
          return (
            (c)
              ? <div><img src={c} /></div>
              : <div></div>
          )

        })}

        {console.log(this.state.dive.pictures)}

      </Container>
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

