import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as NLink, Link } from 'react-router-dom' // Be careful, NavLink is already exported from 'reactstrap'
import logo from '../logo.svg';
import api from '../api';


export default class MainNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  handleLogoutClick(e) {
    api.logout()
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar dark expand="md" className="MainNavbar">
        <Link to="/">
          <img src='/images/logonou.png' style={{ height: "60px" }} to="/" tag={Link} />
        </Link>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/add-dive">New Dive</NavLink>
            </NavItem>}
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/dives/0">Dives</NavLink>
            </NavItem>}
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/favouriteDives">Favourites</NavLink>
            </NavItem>}
            {!api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/signup">Signup</NavLink>
            </NavItem>}
            {!api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/login">Login</NavLink>
            </NavItem>}
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/profile">My Profile</NavLink>
            </NavItem>}

            {api.isLoggedIn() && <NavItem>
              <NavLink tag={Link} to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>
            </NavItem>}
          </Nav>
        </Collapse>
      </Navbar >
    )
  }
}