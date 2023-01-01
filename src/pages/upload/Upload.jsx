import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.inputData = React.createRef();
    this.fileName = React.createRef();
    this.videoPlayer = React.createRef();
    this.state = {
      file: "",
      loading: false,
      deskripsi: "",
      judul: "",
    };
  }

  handleDelete = () => {
    this.inputData.current.value = null;
    this.videoPlayer.current.src = "";
    this.fileName.current.innerHTML =
      "Jangan lupa untuk upload file video dengan format yang sesuai";
  };

  handleOnChange = (e) => {
    if (
      this.inputData.current.files[0].type === "video/mp4" ||
      this.inputData.current.files[0].type === "video/mpeg"
    ) {
      this.fileName.current.innerHTML = `${e.target.files[0].name}`;
      let blobURL = URL.createObjectURL(e.target.files[0]);
      this.videoPlayer.current.src = blobURL;

      const video = {
        preview: URL.createObjectURL(this.inputData.current.files[0]),
        data: this.inputData.current.files[0],
      };

      this.setState({
        file: video,
      });
    } else {
      this.handleDelete();
    }
  };

  handleUploadData = () => {
    if (
      this.state.file === "" ||
      this.state.judul === "" ||
      this.state.deskripsi === ""
    )
      return console.log("data kosong");

    let videoData = new FormData();
    videoData.append("file", this.state.file.data);
    this.setState({
      loading: true,
    });
    axios
      .post(`${process.env.REACT_APP_API_POINT}/uploadFile`, videoData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_API_POINT}/video`, {
            urlVideoID: res.data.response.data.id,
            uploaderID: this.props.user._id,
            deskripsi: this.state.deskripsi,
            judul: this.state.judul,
          })
          .then((res) => {
            this.setState({
              loading: false,
            });
          })
          .catch((err) => {
            this.setState({
              loading: false,
            });
          });
      })
      .catch((err) => {
        console.log("data gagal diupload");
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <div className="mt-32 mx-auto sm:w-[800px] w-[90%]">
        <div className="relative w-full pt-5 bg-white shadow dark:bg-gray-800 rounded-xl">
          <h2 className=" font-semibold text-center text-3xl text-gray-800 dark:text-white">
            Upload Video
          </h2>
          <p className=" text-center tracking-wider font-light text-sm text-gray-800 dark:text-white">
            Upload video hasil karya dari kalian pada bagian ini.
          </p>
          <form className="px-4 mt-10 pb-5">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
              Form data
            </h3>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="col-span-1 rounded-md border border-dashed relative border-gray-200 dark:border-gray-600">
                <input
                  type="file"
                  accept="video/mp4, video/mpeg"
                  onChange={(e) => this.handleOnChange(e)}
                  ref={this.inputData}
                  name="video"
                  id="video"
                  className="h-full z-10 cursor-pointer opacity-0 w-full"
                />
                <p
                  ref={this.fileName}
                  className="w-full text-center cursor-pointer text-gray-700 z-0 absolute top-1/2 -translate-y-1/2 dark:text-gray-300"
                >
                  Upload file kalian disini
                </p>
                <button
                  type="button"
                  onClick={() => this.handleDelete()}
                  className="px-8 py-2.5 leading-5 -translate-y-12 translate-x-2 text-white transition-colors duration-300 bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <div className="col-span-1">
                <video
                  ref={this.videoPlayer}
                  className="w-full rounded-md"
                  controls
                >
                  <source src="" type="video/mp4" />
                </video>
              </div>
              <div className="col-span-2">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="nama"
                >
                  Judul Video
                </label>
                <input
                  id="nama"
                  type="text"
                  onChange={(e) => this.setState({ judul: e.target.value })}
                  placeholder="Masukkan judul dari video kalian"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div className="col-span-2">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="deskripsi"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  type="text"
                  onChange={(e) => this.setState({ deskripsi: e.target.value })}
                  placeholder="Masukkan Deskripsi dari video kalian"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <MoonLoader color="#fff" size={30} loading={this.state.loading} />
              <button
                type="button"
                onClick={this.handleUploadData}
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Upload);
