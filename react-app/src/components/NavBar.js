import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setUser }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" exact={true} activeClassName="active">
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" exact={true} activeClassName="active">
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink to="/images" exact={true} activeClassName="active">
            Images
          </NavLink>
        </li>
        <li>
          <LogoutButton setUser={setUser} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
