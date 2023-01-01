import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    search !== "" &&
      axios
        .get(`${process.env.REACT_APP_API_POINT}/video/find/${search}`)
        .then((res) => {
          props.dispatch({ type: "SET_SEARCH", dataSearch: res.data.data });
        })
        .catch((err) => console.log("video tidak dittemukan"));
  };

  const handleSort = () => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}/video/sort`)
      .then((res) => {
        props.dispatch({ type: "SET_VIDEO", dataVideo: res.data.data });
      })
      .catch((err) => {
        console.log("data gagal diurutkan");
      });
  };

  return (
    <>
      <nav className="fixed top-0 w-screen z-50 bg-white shadow dark:bg-gray-800">
        <div className="container flex flex-wrap md:gap-5 justify-between px-6 py-3 mx-auto md:flex">
          <div className="md:shrink py-0">
            <Link
              to={"/home"}
              onClick={() => props.dispatch({ type: "DEL_SEARCH" })}
              className="sm:text-2xl text-xl text-center min-w-max font-bold text-gray-800 transition-colors duration-300 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
            >
              News Today
            </Link>
          </div>

          <div className="grow hidden sm:flex sm:items-center inset-x-0 py-0 z-20 bg-white dark:bg-gray-800 ">
            <div className="relative mt-4 md:mt-0 w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Search"
              />
            </div>
            <div className="flex">
              <button
                onClick={() => handleSearch()}
                className="text-white hover:bg-gray-900 rounded-full hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-9 h-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-base dark:text-gray-300 text-gray-700 font-semibold">
            <h2>
              {props.dataUser !== null ? props.dataUser.nama : "Not Logged In"}
            </h2>
          </div>
        </div>
      </nav>
      <nav className="fixed z-50 flex px-6 gap-5 items-center content-center rounded-lg left-1/2 -translate-x-1/2 bottom-3 h-10 min-w-max bg-white">
        <Link
          to={"/home"}
          onClick={() => handleSort()}
          className="aspect-square text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zM13.25 5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zm-6.5 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.75 9zm4-1.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link to={"/profile"} className="aspect-square text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        </Link>
        <Link to={"/upload"} className="aspect-square text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 4.74a.75.75 0 001.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7zm-3 0h-1.5v5.25a.75.75 0 001.5 0V7z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  dataUser: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Navbar);
