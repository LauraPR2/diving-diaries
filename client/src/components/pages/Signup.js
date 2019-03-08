import React, { Component } from 'react';
import api from '../../api';
import {
  Container, Input, Button, Col, Label
} from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="profilepage container-login">
        <div>
          <div className="center pb-3"><h2>Create a New Account</h2></div>
          <div className="">
            <form className="profile shadow">
              <Label>Username: </Label>
              <Input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
              <Label>Password: </Label>
              <Input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
              <div className="center">
                <Button onClick={(e) => this.handleClick(e)}>Signup</Button>
              </div>
            </form>
            {this.state.message && <div className="info info-danger">
              {this.state.message}
            </div>}</div>
        </div>
      </div>
    );
  }
}

export default Signup;
