import React, { Component } from "react";
import logo from "../common/logo.svg";
import "../common/logo.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }

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
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(body);
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
                <h2 className="text-lg font-bold text-center text-black uppercase transition duration-500 ease-in-out transform dark:text-gray-100 hover:text-gray-400">
                  <img src={logo} alt="logo" className="logo" />
                </h2>
              </Link>
            </div>
            <h1 className="mt-12 text-xl font-semibold text-center text-black dark:text-gray-100 tracking-ringtighter sm:text-2xl title-font">
              Log in to your account
            </h1>
            <form className="mt-6" noValidate onSubmit={this.onSubmit}>
              <div>
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
                  autoFocus
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                />
                <span className="text-red-500">
                  {errors.email}
                  {errors.emailnotfound}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                  required
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <span className="text-red-500">{errors.password}</span>
              </div>
              <div className="mt-2 text-right"></div>
              <button
                type="submit"
                className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
              >
                Log In
              </button>
            </form>
            <hr className="w-full my-6 border-gray-300" />
            <div className="mt-8 mb-8 text-center dark:text-gray-100">
              <div>
                Need an account?
                <Link
                  to="/register"
                  className="ml-2 font-semibold text-blue-500 rounded-md dark:text-gray-100 hover:text-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
