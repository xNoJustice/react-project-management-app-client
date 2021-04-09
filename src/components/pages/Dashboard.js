import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "./Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
  };

  toggleModal = (e) => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  render() {
    const { projects } = this.props.projects;
    const { name } = this.props.auth.user;

    let content;

    let all_projects = projects.map((project) => (
      <div
        key={project._id}
        className="w-40 m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-28 md:w-48"
      >
        <div className="w-full p-4 bg-gray-100 dark:bg-gray-800">
          <p className="text-lg font-medium text-center text-indigo-500 dark:text-green-300">
            {project.name}
          </p>
          <div className="mt-4 text-center">
            <button
              onClick={() => this.props.history.push(`/project/${project._id}`)}
              className="w-full px-4 py-2 mb-2 text-sm font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Go to Project
            </button>
          </div>
        </div>
      </div>
    ));

    if (projects && projects.length > 0) {
      content = (
        <>
          <div
            key="create"
            className="w-40 m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-28 md:w-48"
          >
            <div className="w-full p-4 bg-gray-100 dark:bg-gray-800">
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={this.toggleModal}
                  className="w-full px-4 py-2 text-sm font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Create another project
                </button>
                <Modal
                  onClose={this.toggleModal}
                  modal={this.state.modal}
                  edit={this.state.edit}
                  name={this.state.name}
                  members={this.state.members}
                  id={this.state.id}
                  owner={this.state.owner}
                />
              </div>
            </div>
          </div>
          {all_projects}
        </>
      );
    } else {
      content = (
        <div
          key="create"
          className="w-40 m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-36 md:w-48"
        >
          <div className="w-full p-4 bg-gray-100 dark:bg-gray-800">
            <p className="text-lg font-medium text-center text-indigo-500 dark:text-green-300">
              You have no projects
            </p>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={this.toggleModal}
                className="w-full px-4 py-2 text-sm font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Create your first project
              </button>
              <Modal onClose={this.toggleModal} modal={this.state.modal} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full max-h-screen pl-0 md:p-4 md:space-y-4">
        <div className="pt-2 pb-24 pl-2 pr-2 mt-10 overflow-auto md:pt-0 md:pr-0 md:pl-0">
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="w-full">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Welcome {name}, Your Projects
              </h1>
              <div className="grid grid-cols-1 xl:grid-cols-5">{content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(Dashboard));
