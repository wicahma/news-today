import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import bgImage from "../../assets/img/mews.webp";
import Error from "../../components/alert/Error";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.toHome = React.createRef();
    this.state = {
      email: "",
      password: "",
      dataUser: [],
      loginStatus: null,
      loginMessage: "",
      error: false,
      loading: false,
    };
  }

  handleLogin = (mail, pass) => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_POINT}/user/${mail}&${pass}`)
      .then((res) => {
        this.setState(
          { dataUser: res.data.data, loginStatus: true, loading: false },
          () => {
            this.props.dispatch({
              type: "SET_USER",
              dataUser: this.state.dataUser,
            });
            localStorage.setItem("dataUser", JSON.stringify(res.data.data));
          }
        );
      })
      .catch((err) => {
        this.setState({
          loginStatus: false,
          loginMessage: "Data yang anda masukkan masih salah",
          error: true,
          loading: false,
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, 1500);
      });
  };

  render() {
    return (
      <div className="bg-white dark:bg-gray-900">
        {this.state.loginStatus === true ? (
          <Navigate to={"/home"} />
        ) : (
          this.state.error === true && <Error msg={this.state.loginMessage} />
        )}
        {this.state.loading && (
          <div className="fixed w-screen h-screen bg-black/50 flex justify-center items-center">
            <MoonLoader color="#fff" size={40} loading={this.state.loading} />
          </div>
        )}
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">News Today</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Adalah sebuah website yang mengedepankan sebuah informasi
                  untuk para penggemar berita khususnya para orangtua dan juga
                  anak muda yang senang akan teknologi
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  News Today
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Masuk untuk mengakses akun anda
                </p>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      id="email"
                      onChange={(e) =>
                        this.setState({
                          email: e.target.value,
                        })
                      }
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Lupa Password?
                      </a>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                      }
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        this.handleLogin(this.state.email, this.state.password)
                      }
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Masuk
                    </button>
                  </div>

                  <p className="mt-3 text-center">
                    <Link
                      to="/home"
                      className="text-blue-500 text-center focus:outline-none focus:underline hover:underline"
                    >
                      Masuk tanpa login
                    </Link>
                  </p>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Belum punya akun? daftar{" "}
                  <Link
                    to={"/register"}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    disini
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataUser: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Login);
