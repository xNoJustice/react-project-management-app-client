import React, { Component } from "react";
import logo from "../common/logo.svg";
import "../common/logo.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.registerUser(body, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center justify-center w-full px-6 bg-gray-100 shadow-xl rounded-xl dark:bg-gray-700 lg:max-w-full lg:px-16 xl:px-12">
          <div className="w-full h-100">
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className="mt-3 mb-4 font-medium text-gray-900 title-font md:mb-0"
              >
                <h2 className="text-lg font-bold text-black uppercase transition duration-500 ease-in-out transform dark:text-gray-100 hover:text-gray-300">
                  <img src={logo} alt="logo" className="logo" />
                </h2>
              </Link>
            </div>
            <h1 className="mt-12 text-2xl font-semibold text-center text-black dark:text-gray-100 tracking-ringtighter sm:text-3xl title-font">
              Create an account
            </h1>
            <form className="mt-6" noValidate onSubmit={this.onSubmit}>
              <div>
                <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="User Name"
                  className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                  autoFocus
                  autoComplete="name"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                />
                <span className="text-red-500">{errors.name}</span>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                  autoComplete="email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                />
                <span className="text-red-500">{errors.email}</span>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                  Password
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-gray-500"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <span className="text-red-500">{errors.password}</span>
              </div>
              <button
                type="submit"
                className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
              >
                Register
              </button>
            </form>
            <hr className="w-full my-6 border-gray-300" />
            <p className="mt-8 mb-8 text-center dark:text-gray-100">
              Do you have account?
              <Link
                to="/"
                className="ml-2 font-semibold text-blue-500 rounded-md dark:text-gray-100 hover:text-blue-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
