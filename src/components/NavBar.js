import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const currentValue = useSelector((state) => state.counter.value);
  const value = useLocation().search;

  const [finalState, setFinalState] = useState({});
  useEffect(() => {
    function UseQuery() {
      return new URLSearchParams(value);
    }
    const AffId = () => {
      let query = UseQuery();
      const parsedHash = new URLSearchParams(window.location.hash.substr(1));
      let culture = query.get("affid") ?? parsedHash.get("affid");
      return culture;
    };
    const Culture = () => {
      let query = UseQuery();
      const parsedHash = new URLSearchParams(window.location.hash.substr(1));
      let culture = query.get("culture") ?? parsedHash.get("culture");

      return culture;
    };
    setFinalState({
      culture: currentValue?.culture || Culture() || "",
      affid: currentValue?.affid || AffId() || 0,
      enableBack: currentValue?.enableBack,
      enableSkip: currentValue?.enableSkip,
      hideHeader: currentValue?.hideHeader,
      hideFooter: currentValue?.hideFooter,
      ui_locales: currentValue?.ui_locales,
      aai: {
        ea: currentValue?.ea || "",
        cc: {
          Login:
            currentValue?.mode !== "register"
              ? {
                  hideSignUp: currentValue?.hideSignUp,
                  disableEmail: currentValue?.disableEmail,
                }
              : null,
          SignUp:
            currentValue?.mode === "register"
              ? {
                  hideLoginCTA: currentValue?.hideLoginCTA,
                  disableEmail: currentValue?.disableEmail,
                }
              : null,
          mode: currentValue?.mode,
        },
      },
    });
  }, [currentValue, value]);
  console.log("---->In the Navbar", finalState, currentValue);

  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/otp"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  OTP
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/external-api"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    External API
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() =>
                      loginWithRedirect({
                        ...finalState,
                        aai: JSON.stringify(finalState.aai),
                        // affid: AffId(),
                        // fragment: `culture=en-us&aff_id=105`,
                        // &aai=${JSON.stringify(
                        //   {
                        //     ea: "value",
                        //     cc: "value",
                        //   }
                        // )}`,
                        // appState: {
                        //   returnTo: "?culture=en-gb&aff_id=105",
                        // },
                      })
                    }
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() =>
                      loginWithRedirect({
                        ...finalState,
                        aai: JSON.stringify(finalState.aai),
                      })
                    }
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
