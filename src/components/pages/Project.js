import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, updateProject } from "../../actions/projectActions";
import { getTasks } from "../../actions/taskActions";
import Tasks from "./Tasks";
import Modal from "./Modal";
import Spinner from "../common/Spinner";

class Project extends Component {
  state = {
    id: "",
    projectName: "",
    teamMembers: [],
    owner: {},
    edit: false,
    page: 1,
  };

  componentDidMount() {
    const page = isNaN(
      parseInt(new URLSearchParams(window.location.search).get("page"))
    )
      ? 1
      : parseInt(new URLSearchParams(window.location.search).get("page"));
    this.setState({ page: page });
    this.props.getProject(this.props.match.params.project);
    this.props.getTasks(this.props.match.params.project, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const page = isNaN(
      parseInt(new URLSearchParams(window.location.search).get("page"))
    )
      ? 1
      : parseInt(new URLSearchParams(window.location.search).get("page"));
    if (
      this.props.match.params.project !== prevProps.match.params.project ||
      page !== prevState.page
    ) {
      this.props.getProject(this.props.match.params.project);
      this.props.getTasks(this.props.match.params.project, page);
      this.setState({ page: page });
    }
  }

  closeEditProject = () => {
    this.setState({ edit: !this.state.edit });
  };

  toggleEditProject = (projectName, teamMembers, id, owner) => {
    this.setState({
      edit: !this.state.edit,
      projectName: projectName,
      teamMembers: teamMembers,
      id: id,
      owner: owner,
    });
  };

  updateProject = () => {
    let teamMembers = this.state.teamMembers.filter(
      (member) => member.name !== "" && member.email !== ""
    );

    let project = {
      _id: this.state.id,
      projectName: this.state.projectName,
      teamMembers: teamMembers,
    };

    this.props.updateProject(project);
    window.location.reload();
  };

  deleteProject = (id) => {
    this.props.deleteProject(id);
  };

  onChange = (e) => {
    if (["name", "email"].includes(e.target.name)) {
      let members = [...this.state.teamMembers];
      members[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ members });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  addMember = (e) => {
    this.setState((prevState) => ({
      teamMembers: [...prevState.teamMembers, { name: "", email: "" }],
    }));
  };

  deleteMember = (index) => {
    let array = [...this.state.teamMembers];
    array.splice(index, 1);
    this.setState({ teamMembers: array });
  };

  render() {
    if (this.state.edit) {
      return (
        <>
          <div className="flex items-center justify-center">
            <div className="relative w-1/2 mx-auto">
              <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg outline-none dark:bg-gray-800">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                    Update Project Info
                  </h3>
                  <div className="absolute mt-1 mb-2 right-4 top-4">
                    <button
                      type="button"
                      onClick={this.closeEditProject}
                      className="float-left px-4 py-2 mt-2 mb-2 ml-2 text-sm font-semibold text-white transition duration-200 ease-in shadow-md rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                      <div className="flex items-center justify-center ">
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
                          <path d="M19 12H6M12 5l-7 7 7 7" />
                        </svg>
                        <span>Cancel</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="relative flex-auto">
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Project Name (required)
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      id="projectName"
                      placeholder="Project Name ..."
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      autoFocus
                      autoComplete="true"
                      required
                      onChange={this.onChange}
                      value={this.state.projectName}
                    />
                  </div>
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block mt-4 font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Add team members (optional)
                    </label>
                    <button
                      className="px-4 py-2 mt-2 text-sm font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      onClick={this.addMember}
                    >
                      Add another member
                    </button>
                    <div>
                      {this.state.teamMembers.map((member, id) => {
                        let memberId = `member-${id}`,
                          emailId = `email-${id}`;
                        return (
                          <div className="flex justify-center" key={id}>
                            <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                              <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                                Member Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                placeholder="Member Name ..."
                                className="w-48 px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                                autoComplete="true"
                                data-id={id}
                                id={memberId}
                                value={this.state.teamMembers[id].name}
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="ml-4 text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                              <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                                Member Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Member Email ..."
                                className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-60 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                                autoComplete="true"
                                data-id={id}
                                id={emailId}
                                value={this.state.teamMembers[id].email}
                                onChange={this.onChange}
                              />
                            </div>
                            <button
                              className="flex items-center mt-8 ml-2 -mr-4 justify-items-center focus:outline-none"
                              onClick={this.deleteMember.bind(this, id)}
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
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                  {this.state.owner._id === this.props.auth.user._id && (
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white bg-red-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={this.deleteProject.bind(this, this.props.id)}
                      style={{ transition: "all .15s ease" }}
                    >
                      Delete Project
                    </button>
                  )}
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={this.updateProject.bind(this, this.props.id)}
                  >
                    Update Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.props.project && this.props.project.teamMembers) {
      const { project } = this.props;
      return (
        <div className="z-20 w-full mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-black dark:text-white sm:text-3xl">
            <span>{project.name}</span>
          </h2>

          <button
            type="button"
            onClick={this.toggleEditProject.bind(
              this,
              project.name,
              project.teamMembers,
              project._id,
              project.owner
            )}
            className="px-4 py-2 mt-2 -mb-4 text-sm font-semibold text-white transition duration-200 ease-in shadow-md rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            <div className="flex items-center justify-center ">
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
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
              <span className="ml-1">Edit Project</span>
            </div>
          </button>
          <Modal
            onClose={this.toggleModal}
            modal={this.state.modal}
            edit={this.state.edit}
            name={this.state.name}
            owner={this.state.owner}
            members={this.state.members}
            id={this.state.id}
          />
          <Tasks />
        </div>
      );
    }

    return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.projects.project,
  tasks: state.tasks,
});

export default connect(mapStateToProps, {
  getProject,
  updateProject,
  getTasks,
})(Project);
