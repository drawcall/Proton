import React from "react";
import Logo from "../assets/images/proton-logo.png";
import "../css/header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.show = false;
    this.menuRef = React.createRef();
  }

  handleClick() {
    this.show = !this.show;
    this.menuRef.current.style.display = this.show ? "block" : "none";
  }

  render() {
    return (
      <header>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item">
                <img src={Logo} alt="Logo" />
              </a>
              <span
                className="navbar-burger burger"
                onClick={this.handleClick.bind(this)}
              >
                <span />
                <span />
                <span />
              </span>
            </div>

            <div className="navbar-menu" ref={this.menuRef}>
              <div className="navbar-end">
                <a
                  className="navbar-item is-active"
                  href="https://drawcall.github.io/Proton/"
                >
                  Home
                </a>
                <a className="navbar-item" href="#examples">
                  Examples
                </a>
                <a
                  className="navbar-item"
                  href="https://projects.jpeer.at/proton/"
                  target="_blank" rel="noopener noreferrer"
                >
                  Documentation
                </a>

                <span className="navbar-item">
                  <a
                    className="button is-info is-inverted"
                    href="https://github.com/drawcall/Proton"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <span className="icon">
                      <i className="fa fa-github" />
                    </span>
                    <span>Github</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
