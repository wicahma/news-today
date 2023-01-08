import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import HomeCard from "../../components/card/HomeCard";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVideo: null,
      loadingSearch: false,
      loading: false,
    };
  }

  getDataVideoAPI = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_POINT}/videos`)
      .then((res) => {
        this.setState({
          dataVideo: res.data.data,
          loading: false,
        });

        this.props.dispatch({ type: "SET_VIDEO", dataVideo: res.data.data });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.getDataVideoAPI();
  }
  render() {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="max-w-2xl mx-auto text-3xl font-semibold tracking-tight text-gray-800 xl:text-4xl dark:text-white">
            Cari berita berita trending yang sedang hangat dibicarakan mulai
            dari <span className="text-blue-500">sekarang.</span>
          </h2>

          <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
            Temukan berita aktual dengan, informasi informasi menarik seputar
            dunia teknologi, bola, berita, sosial, dan juga politik
          </p>
        </div>
        {this.props.dataSearch === null ? (
          this.state.loadingSearch && (
            <div className="fixed w-screen h-screen bg-black/50 flex justify-center items-center">
              <MoonLoader
                color="#fff"
                size={40}
                loading={this.state.loadingSearch}
              />
            </div>
          )
        ) : (
          <div className="w-full mb-20 grid grid-cols-1 bg-gray-800 rounded-2xl py-3 gap-5 px-1 sm:px-8 sm:grid-cols-5">
            <>
              <h3 className="text-white col-span-5 text-2xl font-semibold text-center">
                Hasil pencarian anda
              </h3>
              {this.props.dataSearch.map((data) => {
                return (
                  <HomeCard
                    key={data._id}
                    judul={data.judul}
                    tanggal={data.createdAt.slice(0, -14)}
                    img={`https://drive.google.com/thumbnail?id=${data.urlVideoID}`}
                    id={data._id}
                  />
                );
              })}
            </>
          </div>
        )}
        <div className="w-full grid grid-cols-1 gap-5 px-1 sm:px-8 sm:grid-cols-5">
          {this.props.dataVideo === null
            ? this.state.loading && (
                <div className="fixed w-screen h-screen left-0 top-0 bg-black/50 flex justify-center items-center">
                  <MoonLoader
                    color="#fff"
                    size={40}
                    loading={this.state.loading}
                  />
                </div>
              )
            : this.props.dataVideo.map((data) => {
                return (
                  <HomeCard
                    key={data._id}
                    judul={data.judul}
                    tanggal={data.createdAt.slice(0, -14)}
                    img={`https://drive.google.com/thumbnail?id=${data.urlVideoID}`}
                    id={data._id}
                  />
                );
              })}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  dataUser: state.mainStore.dataUser,
  dataVideo: state.mainStore.dataVideo,
  dataSearch: state.mainStore.dataSearch,
});

export default connect(mapStateToProps)(Home);
