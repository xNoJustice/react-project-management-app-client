import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { getProjects } from "../../actions/projectActions";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Project from "../pages/Project";
import Tasks from "../pages/Tasks";
import Spinner from "../common/Spinner";
import Header from "./Header";

class Layout extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects, projectsLoading } = this.props.projects;

    let content;

    if (projects === null || projectsLoading) {
      content = <Spinner />;
    } else if (projects.length > 0) {
      content = (
        <main className="relative w-full h-screen overflow-auto bg-gray-100 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <Sidebar projects={projects} />
            <div className="flex flex-col w-full md:space-y-4">
              <Header />
              <Switch>
                <Route
                  exact
                  path="/dashboard"
                  projects={projects}
                  component={Dashboard}
                />
                <Route
                  exact
                  path="/tasks"
                  projects={projects}
                  component={Tasks}
                />
                <Route exact path="/project/:project" component={Project} />
              </Switch>
            </div>
          </div>
        </main>
      );
    } else {
      content = (
        <main className="relative w-full h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <Sidebar />
            <div className="flex flex-col w-full md:space-y-4">
              <Header />
              <Switch>
                <Route
                  exact
                  path="/dashboard"
                  projects={[]}
                  component={Dashboard}
                ></Route>
              </Switch>
            </div>
          </div>
        </main>
      );
    }

    return <Router>{content}</Router>;
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  projects: state.projects,
});

export default withRouter(connect(mapStateToProps, { getProjects })(Layout));
