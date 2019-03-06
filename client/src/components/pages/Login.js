import React, { Component } from 'react';
import api from '../../api';
import {
  Container, Input, Button, Col
} from 'reactstrap';




class Login extends Component {
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
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="container-login">
        <div className="login">
          <div className="p20"><h2>Log in to your account</h2></div>
          <form className="shadow">
            <label>Username: </label>
            <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
            <label>Password:</label>
            <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />

            <div className="center"><Button onClick={(e) => this.handleClick(e)}>Login</Button></div>
          </form>
          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}</div>
      </div>
    );
  }
}

export default Login;
