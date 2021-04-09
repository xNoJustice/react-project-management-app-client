import React, { Component } from "react";
import { connect } from "react-redux";
import { completeTask, deleteTask } from "../../actions/taskActions";
import Modal from "./Modal";
import Spinner from "../common/Spinner";
import { Link, withRouter } from "react-router-dom";

class Tasks extends Component {
  state = {
    id: "",
    taskId: "",
    taskName: "",
    assignee: "",
    dateDue: "",
    modal: false,
    task: false,
    editTask: false,
  };

  toggleTaskModal = () => {
    this.setState({
      modal: !this.state.modal,
      task: !this.state.task,
    });
  };

  toggleEditTaskModal = (taskName, assignee, dateDue, id) => {
    this.setState({
      modal: !this.state.modal,
      editTask: !this.state.editTask,
      taskName: taskName,
      assignee: assignee,
      dateDue: dateDue,
      taskId: id,
    });
  };

  completeTask = (id) => {
    this.props.completeTask(id);
    window.location.reload();
  };

  deleteTask = (id) => {
    this.props.deleteTask(id);
    window.location.reload();
  };
  render() {
    if (!this.props.tasks.tasksLoading) {
      const tasks = this.props.tasks.tasks.docs;
      const {
        limit,
        page,
        pagingCounter,
        totalDocs,
        totalPages,
      } = this.props.tasks.tasks;
      return (
        <div className="container max-w-3xl px-4 mx-auto sm:px-8">
          <div>
            <div className="px-4 -mx-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full rounded-lg shadow">
                <button
                  type="button"
                  onClick={this.toggleTaskModal}
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
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add Task</span>
                  </div>
                </button>
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-gray-100 dark:bg-gray-800 dark:text-indigo-500"
                      >
                        Task
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-gray-100 dark:bg-gray-800 dark:text-indigo-500"
                      >
                        Assignee
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-gray-100 dark:bg-gray-800 dark:text-indigo-500"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-gray-100 dark:bg-gray-800 dark:text-indigo-500"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-gray-100 dark:bg-gray-800 dark:text-indigo-500"
                      >
                        Complete <br />
                        Edit/Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task._id}>
                        <td className="px-5 py-5 text-sm bg-gray-100 border-b-4 border-gray-200 dark:border-gray-700 dark:bg-gray-600">
                          <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
                            {task.taskName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-gray-100 border-b-4 border-gray-200 dark:border-gray-700 dark:bg-gray-600">
                          <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
                            {task.assignee === this.props.auth.user.email
                              ? "You"
                              : task.assignee || "Unassigned"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-gray-100 border-b-4 border-gray-200 dark:border-gray-700 dark:bg-gray-600">
                          <p className="text-gray-900 whitespace-no-wrap dark:text-gray-200">
                            {task.dateDue === ""
                              ? "Not Set"
                              : new Date(task.dateDue).toDateString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-gray-100 border-b-2 border-gray-200 dark:border-gray-700 dark:bg-gray-600">
                          <span
                            className={
                              task.status
                                ? "relative inline-block px-3 py-1 font-semibold leading-tight text-green-800"
                                : "relative inline-block px-3 py-1 font-semibold leading-tight text-red-800 dark:text-red-300"
                            }
                          >
                            <span
                              aria-hidden="true"
                              className={
                                task.status
                                  ? "absolute inset-0 bg-green-200 rounded-full opacity-50"
                                  : "absolute inset-0 bg-red-500 rounded-full opacity-50"
                              }
                            ></span>
                            <span className="relative">
                              {task.status ? "Completed" : "Not Completed"}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm bg-gray-100 border-b-4 border-gray-200 dark:border-gray-700 dark:bg-gray-600">
                          <button
                            onClick={this.completeTask.bind(this, task._id)}
                            className="mr-1 text-green-300 focus:outline-none"
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
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </button>
                          <button
                            onClick={this.toggleEditTaskModal.bind(
                              this,
                              task.taskName,
                              task.assignee,
                              task.dateDue,
                              task._id
                            )}
                            className="mr-1 text-blue-500 focus:outline-none"
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
                              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                            </svg>
                          </button>
                          <button
                            onClick={this.deleteTask.bind(this, task._id)}
                            className="text-red-500 focus:outline-none"
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
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="float-left">
                  <p className="leading-5 text-gray-700 dark:text-gray-100">
                    Showing
                    <span className="font-medium">
                      {" "}
                      {pagingCounter > totalDocs
                        ? totalDocs
                        : pagingCounter}{" "}
                    </span>
                    to
                    <span className="font-medium">
                      {" "}
                      {page * limit > totalDocs ? totalDocs : page * limit}{" "}
                    </span>
                    of
                    <span className="font-medium"> {totalDocs} </span>
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex shadow-sm">
                    <div>
                      <Link
                        to={{
                          search: `?page=${page - 1 > 0 ? page - 1 : 1}`,
                        }}
                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div>
                      {page - 1 > 0 && (
                        <Link
                          to={{
                            search: `?page=${page - 1 >= 0 ? page - 1 : 1}`,
                          }}
                          className={
                            page - 1 === page
                              ? "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-100 transition duration-150 ease-in-out bg-blue-600 border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 hover:bg-tertiary"
                              : "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded-r-md hover:text-gray-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                          }
                        >
                          {page - 1}
                        </Link>
                      )}
                      {page < totalPages && (
                        <Link
                          to={{
                            search: `?page=${page >= 1 ? page : 1}`,
                          }}
                          className={
                            page
                              ? "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-100 transition duration-150 ease-in-out bg-blue-600 border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 hover:bg-tertiary"
                              : "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded-r-md hover:text-gray-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                          }
                        >
                          {page}
                        </Link>
                      )}
                      {page + 1 <= totalPages && (
                        <Link
                          to={{
                            search: `?page=${page + 1 >= 2 ? page + 1 : 1}`,
                          }}
                          className={
                            page + 1 === page
                              ? "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-100 transition duration-150 ease-in-out bg-blue-600 border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 hover:bg-tertiary"
                              : "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded-r-md hover:text-gray-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                          }
                        >
                          {page + 1}
                        </Link>
                      )}
                    </div>
                    <div>
                      <Link
                        to={{
                          search: `?page=${
                            page + 1 <= totalPages ? page + 1 : totalPages
                          }`,
                        }}
                        className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </nav>
                </div>
                <Modal
                  onClose={this.toggleTaskModal}
                  modal={this.state.modal}
                  task={this.state.task}
                  id={this.state.id}
                  editTask={this.state.editTask}
                  taskId={this.state.taskId}
                  taskName={this.state.taskName}
                  assignee={this.state.assignee}
                  dateDue={this.state.dateDue}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  tasks: state.tasks,
});

export default withRouter(
  connect(mapStateToProps, {
    completeTask,
    deleteTask,
  })(Tasks)
);
