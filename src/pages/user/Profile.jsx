import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: {
        nama: this.props.dataUser.nama,
        email: this.props.dataUser.email,
        password: this.props.dataUser.password,
        passwordConfirmation: this.props.dataUser.password,
      },
    };
  }

  handleOnChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const newData = { ...this.state.dataUsers };
    newData[id] = value;
    this.setState({ dataUsers: newData });
  };

  handleSendChange = (data) => {
    if (data.password !== data.passwordConfirmation)
      return alert("Please enter a correct password");
    axios
      .put(`http://localhost:4123/user/${this.props.dataUser._id}`, {
        nama: this.state.dataUsers.nama,
        email: this.state.dataUsers.email,
        password: this.state.dataUsers.password,
      })
      .then((res) => alert("data berhasil dirubah, silahkan login ulang!"))
      .catch((err) => alert("Error, data gagal dirubah!"));
  };
  render() {
    return (
      <div className="mt-32  mx-auto sm:w-[800px] w-[90%] ">
        <div className="relative w-full pt-20 bg-white shadow dark:bg-gray-800 rounded-xl">
          <h2 className=" font-semibold text-center text-3xl text-gray-800 dark:text-white">
            {this.props.dataUser.nama}
          </h2>
          <p className=" text-center tracking-wider font-light text-sm text-gray-800 dark:text-white">
            {this.props.dataUser.email}
          </p>
          <button
            type="button"
            onClick={() => {
              this.props.dispatch({ type: "DELETE_USER" });
              localStorage.removeItem("dataUser");
              alert("anda sudah berhasil logout!");
            }}
            className="px-6 py-2 mt-4 font-normal absolute left-1/2 -translate-x-1/2 text-white transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
          >
            Logout
          </button>
          <form className="px-4 mt-16 pb-5">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
              Update Data
            </h3>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="nama"
                >
                  Nama
                </label>
                <input
                  id="nama"
                  type="text"
                  onChange={(e) => this.handleOnChange(e)}
                  defaultValue={this.props.dataUser.nama}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={(e) => this.handleOnChange(e)}
                  defaultValue={this.props.dataUser.email}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  onChange={(e) => this.handleOnChange(e)}
                  defaultValue={this.props.dataUser.password}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Password Confirmation
                </label>
                <input
                  id="passwordConfirmation"
                  type="password"
                  onChange={(e) => this.handleOnChange(e)}
                  defaultValue={this.props.dataUser.password}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => this.handleSendChange(this.state.dataUsers)}
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            </div>
          </form>
          <img
            className=" h-28 aspect-square rounded-full absolute -top-14 left-1/2 -translate-x-1/2 "
            src="https://picsum.photos/600/600/?random=12"
            alt="user-profile"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataUser: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Profile);
