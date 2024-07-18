import React, { useEffect, useState } from "react";
import api from "./services/api";
import logo from "./assets/logo.png";

export default function Header({ history }) {

  async function handleLogout(event) {

    event.preventDefault();
    localStorage.clear()
    window.location.href = "/login";
  };

  //useEffect(() => {
    //const usertype = localStorage.getItem('eloyusertype');
    //if(usertype === null) window.location.href = "/login";
  //}, []);

  return (
    <div>
      <header className="main-header">
        <a href="/painel" className="logo">
          <span className="logo-mini">
            <b>S F</b>
          </span>
          <span className="logo-lg">
            <img src={logo} width={190}></img>
          </span>
        </a>
        <nav className="navbar navbar-static-top">

          <a
            href="url_f"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">

              

              {/* <li className="dropdown notifications-menu">
                <a
                  href="url_f"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-bell-o" />
                  <span className="label label-warning">10</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 10 notifications</li>
                  <li>

                    <ul className="menu">
                      <li>
                        <a href="url_f">
                          <i className="fa fa-users text-aqua" /> 5 new members
                          joined today
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-warning text-yellow" /> Very long
                          description here that may not fit into the page and
                          may cause design problems
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-users text-red" /> 5 new members
                          joined
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-shopping-cart text-green" /> 25
                          sales made
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-user text-red" /> You changed your
                          username
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="url_f">View all</a>
                  </li>
                </ul>
              </li> */}

              

              <li className="user-menu">
                <a onClick={handleLogout} style={{cursor: 'pointer'}}>
                  <span className="hidden-xs"><i className="fa fa-sign-out" /> Sair</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
