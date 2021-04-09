import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  state = {
    dropdown: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  // Close dropdown when click outside
  handleClick = (e) => {
    if (this.state.dropdown && !this.node.contains(e.target)) {
      this.setState({ dropdown: !this.state.dropdown });
    }
  };

  onLogoutClick = (e) => {
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };

  handleDropdown = (e) => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  render() {
    const { name } = this.props.auth.user;
    return (
      <header
        className="z-40 flex items-center justify-between w-full h-12"
        ref={(node) => (this.node = node)}
      >
        <div className="relative flex items-center justify-end w-full">
          <div className="flex justify-center px-12">
            <div className="relative">
              <div
                onClick={() => this.handleDropdown()}
                className="flex items-center justify-center space-x-3 cursor-pointer"
              >
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  <div className="cursor-pointer">{name}</div>
                </div>
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src={
                      "https://ui-avatars.com/api/?&background=0D8ABC&color=fff&name=" +
                      name
                    }
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              {this.state.dropdown ? (
                <div className="absolute right-0 w-40 py-2 mt-2 shadow-xl rounded-2xl">
                  <div className="absolute right-0 w-32 mt-2 origin-top-right bg-gray-100 rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1 divide-y divide-gray-100">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="flex flex-col ml-2">
                          <span>Home</span>
                        </span>
                      </Link>
                      <button
                        onClick={() => this.onLogoutClick()}
                        className="flex items-center px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
                        </svg>
                        <span className="flex flex-col ml-2">
                          <span>Log out</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));
