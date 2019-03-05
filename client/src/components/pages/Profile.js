import React, { Component } from 'react';
import {
  Container, Input, Button
} from 'reactstrap'
import api from '../../api';
import { withRouter } from 'react-router-dom';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      editing: false,
      typeofDiver: ""
    }
  }
  save = () => {
    api.editProfile(this.state.profile)
      .then(result => {
        console.log("Successful edit")
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


  changeProfile = (event) => {
    var updatedProfile = this.state.profile
    updatedProfile[event.target.name] = event.target.value
    this.setState({
      profile: updatedProfile
    })
  }

  render() {
    console.log(this.state)
    return (
      <Container className="Profile">
        <h2>My Profile</h2>

        {(this.state.editing)
          ?
          <span><Button onClick={this.save}>Save</Button>
            <Button onClick={this.save}>Cancel</Button></span>

          : <span><Button onClick={this.startEditing}>Edit</Button></span>
        }

        <h3>User information</h3>

        <div>Name:
          {(this.state.editing)
            ? <Input type="text" id="name" onChange={this.changeProfile} value={this.state.profile.name} name="name" />
            : <span>{this.state.profile.name}</span>
          }
        </div>


        <div>Username:
          {(this.state.editing)
            ? <Input type="text" id="profile.username" value={this.state.profile.username}
              onChange={this.changeProfile}
              name="username" />
            : <span>{this.state.profile.username}</span>
          }
        </div>
        <div>Password:
        {(this.state.editing)
            ? <Input type="text" id="password" value={this.state.profile.password} name="password" />
            : <span>{this.state.profile.password}</span>
          }</div>
        <div>Email:
        {(this.state.editing)
            ? <Input type="text" id="email"
              onChange={this.changeProfile}
              value={this.state.profile.email} name="email" />
            : <span>{this.state.profile.email}</span>
          }</div>

        <h3>Diving information</h3>

        <div>Diving practice:
        {(this.state.editing)
            ? <Input type="select" id="typeofDiver" value={this.state.profile.typeofDiver} name="typeofDiver"
              onChange={this.changeProfile}>
              <option value="Scuba diver">Scuba diver</option>
              <option value="Free diver">Free diver</option>
              <option value="Scuba and Free diver">Scuba and Free diver</option>
            </Input>
            : <span>{this.state.profile.typeofDiver}</span>
          }</div>

        <div>Experience Level:
        {(this.state.editing)
            ? <Input type="text" id="experienceLv" value={this.state.profile.experienceLv} onChange={this.changeProfile} name="experienceLv" />
            : <span>{this.state.profile.experienceLv}</span>
          }</div>

        <div>Weights:
        {(this.state.editing)
            ? <Input type="number" id="weightBelt" value={this.state.profile.weightBelt} onChange={this.changeProfile} name="weightBelt" />
            : <span>{this.state.profile.weightBelt}</span>
          }</div>


        <h4>Personal Records</h4>

        <div>Depth:
        {(this.state.editing)
            ? <Input type="number" id="recordDepth" onChange={this.changeProfile} value={this.state.profile.recordDepth} name="recordDepth" />
            : <span> {this.state.profile.recordDepth}</span>
          }</div>

        {(this.state.profile && this.state.profile.typeofDiver && (this.state.profile.typeofDiver === "Free diver" || this.state.profile.typeofDiver === "Scuba and Free diver"))
          ?
          <div>
            <span>Time:</span>
            {(this.state.editing)
              ? <Input type="text" id="recordTime" onChange={this.changeProfile} value={this.state.profile.recordTime} name="recordTime" />
              : <span> {this.state.profile.recordTime}</span>
            }
          </div>
          : <div></div>
        }
      </Container >
    );
  }

  componentDidMount() {
    api.getProfile()
      .then(profile => {
        console.log(profile)
        this.setState({
          profile: profile
        })
      })
      .catch(err => console.log(err))
  }

}