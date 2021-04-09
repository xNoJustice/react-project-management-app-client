import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { createProject, deleteProject } from "../../actions/projectActions";
import { createTask, updateTask, deleteTask } from "../../actions/taskActions";

class Modal extends Component {
  state = {
    projectName: "",
    teamMembers: [{ name: "", email: "" }],
    taskName: "",
    assignee: "",
    dateDue: "",
    taskId: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.editTask) {
      let taskName = prevState.taskName
        ? prevState.taskName
        : nextProps.taskName;
      return { taskName: taskName };
    }
    return null;
  }

  createProject = () => {
    let members = this.state.teamMembers.filter(
      (member) => member.name !== "" && member.email !== ""
    );

    let project = {
      projectName: this.state.projectName,
      members: members,
    };

    this.props.createProject(project);
    this.onClose();
  };

  createTask = () => {
    let task = {
      project: this.props.projects.project._id,
      taskName: this.state.taskName,
      assignee: this.state.assignee,
      dateDue: this.state.dateDue,
    };

    this.props.createTask(task);
    this.onClose();
    window.location.reload();
  };

  updateTask = (id) => {
    let task = {
      id: id,
      taskName: this.state.taskName,
      assignee: this.state.assignee || this.props.assignee,
      dateDue: this.state.dateDue,
    };

    this.props.updateTask(task);
    this.onClose();
    window.location.reload();
  };

  deleteTask = (id) => {
    this.props.deleteTask(id);
    this.onClose();
    window.location.reload();
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

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      projectName: "",
      taskName: "",
      assignee: "",
      monthDue: "",
      dayDue: "",
      teamMembers: [{ name: "", email: "" }],
    });
  };

  render() {
    if (!this.props.modal) {
      return null;
    }

    // CREATE TASK MODAL
    if (this.props.task) {
      const { teamMembers } = this.props.projects.project;
      const { name, email } = this.props.auth.user;

      let membersOptions = teamMembers.map(
        (member, index) =>
          member.name !== "" && (
            <option key={index} value={member.email}>
              {member.name}
            </option>
          )
      );

      return (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-1/3 mx-auto my-6">
              <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                    Create Task
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      className="bg-transparent border border-transparent"
                      onClick={this.onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700 dark:text-white"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative flex-auto p-6">
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Task Name (required)
                    </label>
                    <input
                      type="text"
                      name="taskName"
                      id="taskName"
                      placeholder="Task Name ..."
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      autoFocus
                      autoComplete="true"
                      required
                      value={this.state.taskName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Assignee (required)
                    </label>
                    <select
                      name="assignee"
                      id="assignee"
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      onChange={this.onChange}
                      value={this.state.assignee}
                      required
                    >
                      <option disabled value="">
                        Assign to
                      </option>
                      <option value={email}>{name + " (You)"}</option>
                      {membersOptions}
                    </select>
                  </div>
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Due Date (required)
                    </label>
                    <input
                      type="date"
                      name="dateDue"
                      id="dateDue"
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      required
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={this.createTask}
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      );
    }
    // EDIT TASK MODAL
    else if (this.props.editTask) {
      const { teamMembers } = this.props.projects.project;
      const { name, email } = this.props.auth.user;

      const { assignee, taskId } = this.props;
      let assigneeName;

      teamMembers.forEach((member) => {
        if (member.email === assignee) {
          assigneeName = member.name;
        } else if (assignee) {
          assigneeName = name + " (You)";
        }
      });

      let membersOptions = teamMembers.map((member, index) => {
        if (member.name !== assigneeName) {
          return (
            <option key={member._id} value={member.email}>
              {member.name}
            </option>
          );
        }
        return null;
      });

      return (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-1/3 mx-auto my-6">
              <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                    Update Task
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      className="bg-transparent border border-transparent"
                      onClick={this.onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700 dark:text-white"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative flex-auto p-6">
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Task Name (required)
                    </label>
                    <input
                      type="text"
                      name="taskName"
                      id="taskName"
                      placeholder="Task Name ..."
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      autoFocus
                      autoComplete="true"
                      required
                      value={this.state.taskName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Assignee (required)
                    </label>
                    <select
                      name="assignee"
                      id="assignee"
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      onChange={this.onChange}
                      value={this.state.assignee}
                      required
                    >
                      {!assignee && (
                        <option disabled value="">
                          Assign to
                        </option>
                      )}
                      {assignee && (
                        <option value={assignee}>{assigneeName}</option>
                      )}
                      {assigneeName !== name + " (You)" && (
                        <option value={email}>{name + " (You)"}</option>
                      )}
                      {membersOptions}
                    </select>
                  </div>
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Due Date (required)
                    </label>
                    <input
                      type="date"
                      name="dateDue"
                      id="dateDue"
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      required
                      onChange={this.onChange}
                      value={
                        this.state.dateDue
                          ? this.state.dateDue
                          : moment(this.props.dateDue).format("YYYY-MM-DD")
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                  {assigneeName === this.props.auth.user.username && (
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-red-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={this.deleteTask.bind(this, taskId)}
                      style={{ transition: "all .15s ease" }}
                    >
                      Delete Task
                    </button>
                  )}
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={this.updateTask.bind(this, taskId)}
                  >
                    Update Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      );
    }
    // CREATE PROJECT MODAL
    else
      return (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-1/3 mx-auto my-6">
              <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                    Create Project
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      className="bg-transparent border border-transparent"
                      onClick={this.onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700 dark:text-white"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative flex-auto p-6">
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
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={this.createProject}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  projects: state.projects,
  tasks: state.tasks,
});

export default connect(mapStateToProps, {
  createProject,
  deleteProject,
  createTask,
  updateTask,
  deleteTask,
})(withRouter(Modal));
