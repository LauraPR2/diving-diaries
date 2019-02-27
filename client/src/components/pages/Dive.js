import React, { Component } from 'react';
import {
  Container,
} from 'reactstrap'

class Dive extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <Container className="Dive">
        <h2>Dive</h2>
        <p>Journal about your amazing diving experiences!</p>
        <button className="btn btn-primary">Hello</button>
      </Container>
    );
  }
}

export default Dive;
