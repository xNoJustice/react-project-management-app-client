import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="w-full bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="flex items-center justify-center min-h-screen py-16 m-auto">
          <div className="pb-8 overflow-hidden bg-gray-100 shadow dark:bg-gray-700 sm:rounded-lg">
            <div className="pt-8 text-center border-t border-gray-200">
              <h1 className="font-bold text-purple-400 text-9xl">404</h1>
              <h1 className="py-8 text-6xl font-medium dark:text-white">
                oops! Page not found
              </h1>
              <p className="px-12 pb-8 text-2xl font-medium dark:text-white">
                Oops! The page you are looking for does not exist. It might have
                been moved or deleted.
              </p>
              <Link
                to="/"
                className="px-6 py-3 mr-6 font-semibold text-white rounded-md bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
              >
                HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
