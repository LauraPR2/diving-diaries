import React, { Component } from 'react';
import {
  Container,
} from 'reactstrap'
import api from '../../api';


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  render() {
    return (
      <Container className="Profile">
        <h2>My Profile</h2>
        <div>Username: {this.state.profile.username}</div>
        <div>Password: {this.state.profile.password}</div>
        <div>{this.state.profile.email}</div>
        <div>{this.state.profile.weightBelt}</div>
        <div>{this.state.profile.username}</div>




        <button className="btn btn-primary">Hello</button>
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

