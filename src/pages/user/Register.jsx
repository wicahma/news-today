import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/img/mews.webp";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRegist: {
        nama: "",
        kelamin: null,
        email: "",
        password: "",
      },
    };
  }

  handleForm = (e) => {
    let value = e.target.value;
    let id = e.target.id;
    let registNew = { ...this.state.dataRegist };
    registNew[id] = value;
    this.setState({
      dataRegist: registNew,
    });
  };

  handleSend = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_POINT}/user`, data)
      .then((res) => {
        console.log("user berhasil ditambahkan");
      })
      .catch((err) => {
        console.log("user gagal register");
      });
  };

  render() {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Buat akun <span className="font-bold underline">NewsToday</span>{" "}
                kalian sekarang.
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Ayo buat akun sesegera mungkin agar kalian dapat menggunakan
                fitur dan juga fasilitas yang disediakan oleh News Today
              </p>

              <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    id="nama"
                    onChange={(e) => this.handleForm(e)}
                    placeholder="Nizar"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Gender
                  </label>
                  <select
                    defaultValue={"none"}
                    id="kelamin"
                    onChange={(e) => this.handleForm(e)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="none" disabled>
                      none
                    </option>
                    <option value={true}>Laki Laki</option>
                    <option value={false}>Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => this.handleForm(e)}
                    placeholder="nizar@gmail.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    autoComplete="password"
                    onChange={(e) => this.handleForm(e)}
                    placeholder="Masukkan password kalian"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="re-password"
                    autoComplete="re-password"
                    // onChange={(e) => this.handleForm(e)}
                    placeholder="Masukkan password kalian"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => this.handleSend(this.state.dataRegist)}
                  className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <span>Regist </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <Link
                  to={"/login"}
                  className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors border-2  duration-300 transform bg-transparent rounded-lg hover:bg-orange-400 hover:border-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50"
                >
                  <span>Login </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
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
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
