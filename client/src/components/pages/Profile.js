import React, { Component } from 'react';
import {
  Container, Input, Label
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
      <div className="profilepage">
        <div className="profile shadow">
          <div className="row justify-content-center">
            <div className="col-5">
              <div className="row justify-content-center">
                <h2>My Profile</h2>
              </div>
            </div>
            <div className="col-7 d-flex ticons">
              {(this.state.editing)
                ?
                <div>
                  <div onClick={this.save} className="ui animated button" tabIndex="0">
                    <div className="visible content">Save</div>
                    <div className="hidden content">
                      <i className="save outline icon"></i></div>
                  </div>

                  <div onClick={this.save} className="ui animated button" tabIndex="0">
                    <div className="visible content">Cancel</div>
                    <div className="hidden content">
                      <i className="close icon"></i></div>
                  </div>
                </div>

                :
                <div>
                  <div onClick={this.startEditing} className="ui animated button" tabIndex="0">
                    <div className="visible content">Next</div>
                    <div className="hidden content">
                      <i className="edit outline icon"></i></div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="row pt-3 pb-2 justify-content-center">
            <h3>User information</h3>
          </div>
          <div className="row justify-content-center">
            <div className="ticons d-flex col-5">
              <Label>Name:</Label>
            </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="text" id="name" onChange={this.changeProfile} value={this.state.profile.name} name="name" />
                : <Label>{this.state.profile.name}</Label>
              }
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex ticons col-5">
              Username:
        </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="text" id="profile.username" value={this.state.profile.username}
                  onChange={this.changeProfile}
                  name="username" />
                : <span>{this.state.profile.username}</span>
              }
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex ticons col-5">
              <Label>Email:</Label>
            </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="text" id="email"
                  onChange={this.changeProfile}
                  value={this.state.profile.email} name="email" />
                : <span>{this.state.profile.email}</span>
              }</div>
          </div>
          <div className="row pt-3 pb-2 justify-content-center">
            <h3>Diving information</h3>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex ticons col-5">
              <Label>Diving practice:</Label>
            </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="select" id="typeofDiver" value={this.state.profile.typeofDiver} name="typeofDiver"
                  onChange={this.changeProfile}>
                  <option value="Scuba diver">Scuba diver</option>
                  <option value="Free diver">Free diver</option>
                  <option value="Scuba and Free diver">Scuba and Free diver</option>
                </Input>
                : <span>{this.state.profile.typeofDiver}</span>
              }</div>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex ticons col-5">
              <Label>Experience Level:</Label>
            </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="text" id="experienceLv" value={this.state.profile.experienceLv} onChange={this.changeProfile} name="experienceLv" />
                : <span>{this.state.profile.experienceLv}</span>
              }
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex ticons col-5">
              <Label>Weights:</Label>
            </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="number" id="weightBelt" value={this.state.profile.weightBelt} onChange={this.changeProfile} name="weightBelt" />
                : <span>{this.state.profile.weightBelt}</span>
              }
            </div>
          </div>
          <div className="row pt-3 pb-2 justify-content-center">
            <h4>Personal Records</h4>
          </div>
          <div className="row justify-content-center">
            <div className="d-flex ticons col-5">
              <Label>Depth:</Label>
            </div>
            <div className="col-7">
              {(this.state.editing)
                ? <Input type="number" id="recordDepth" onChange={this.changeProfile} value={this.state.profile.recordDepth} name="recordDepth" />
                : <span>{this.state.profile.recordDepth}</span>
              }
            </div>
          </div>
          {(this.state.profile && this.state.profile.typeofDiver && (this.state.profile.typeofDiver === "Free diver" || this.state.profile.typeofDiver === "Scuba and Free diver"))
            ?
            <div className="row justify-content-center">
              <div className="d-flex ticons col-5">
                <Label>Time:</Label>
              </div>
              <div className="col-7">
                {(this.state.editing)
                  ? <div><Input type="text"
                    id="recordTime"
                    onChange={this.changeProfile}
                    value={this.state.profile.recordTime} name="recordTime" />
                    <span>{this.state.profile.recordTime}</span>
                  </div>
                  : <div></div>
                }
              </div>
            </div>
            : <div></div>
          }

        </div>
      </div>
    )
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