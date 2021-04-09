import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import logo from "../common/logo.svg";
import "../common/logo.css";

class Sidebar extends Component {
  onLogoutClick = (e) => {
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };

  render() {
    const { projects } = this.props.projects;

    return (
      <div className="relative h-screen overflow-y-auto lg:block w-80 dark:bg-gray-900">
        <div className="flex flex-row h-full">
          <nav className="flex flex-col justify-between w-40 h-screen text-center rounded-xl">
            <div className="mt-5 mb-10">
              <Link
                to="/dashboard"
                className="mb-4 font-medium text-gray-900 title-font md:mb-0"
              >
                <h2 className="flex justify-center text-lg font-bold text-center text-black uppercase transition duration-500 ease-in-out transform dark:text-gray-100 hover:text-gray-400">
                  <img
                    src={logo}
                    alt="logo"
                    className="logo"
                    style={{ height: "6vmin" }}
                  />
                </h2>
              </Link>
              <div className="mt-10">
                <ul>
                  <li className="my-px">
                    <span className="flex px-4 my-4 text-sm font-medium text-gray-400 uppercase">
                      Home
                    </span>
                  </li>
                  <li className="my-px">
                    <Link
                      to={"/dashboard"}
                      className="flex items-center justify-center h-12 px-4 rounded-lg"
                    >
                      <span className="flex px-4 my-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        <svg
                          className="mr-2 -mt-1"
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
                        Home
                      </span>
                    </Link>
                  </li>
                  <li className="my-px">
                    <button
                      onClick={this.onLogoutClick}
                      className="flex items-center justify-center h-12 px-4 rounded-lg"
                    >
                      <span className="flex px-4 my-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        <svg
                          className="ml-4 mr-2 -mt-1"
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
                          <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
                        </svg>
                        Logout
                      </span>
                    </button>
                  </li>
                  <li className="my-px">
                    <span className="flex px-4 my-4 text-sm font-medium text-gray-400 uppercase">
                      Projects
                    </span>
                  </li>
                  {projects.map((project) => (
                    <li key={project._id} className="my-px">
                      <Link
                        to={`/project/${project._id}`}
                        className="flex items-center justify-center h-12 px-4 rounded-lg"
                      >
                        <span className="flex px-4 my-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                          {project.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default withRouter(
  connect(mapStateToProps, { logoutUser })(withRouter(Sidebar))
);
