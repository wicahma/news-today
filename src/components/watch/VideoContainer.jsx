import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Komentar from "./Komentar";

const VideoContainer = (props) => {
  const params = useParams();
  const [video, setVideo] = useState();
  const [komentar, setKomentar] = useState();
  const [myKomentar, setMyKomentar] = useState();
  const [sendKomentar, setSendkomentar] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4123/video/${params.data}`)
      .then((res) => {
        setVideo(res.data.data);
      })
      .catch((err) => {
        console.log("video tidak ditemukan");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4123/komentar/${params.data}`)
      .then((res) => {
        setKomentar(res.data.data);
      })
      .catch((err) => {
        console.log("komentar tidak ada");
      });
  }, [sendKomentar]);

  const handleOnclick = (id) => {
    axios
      .delete(`http://localhost:4123/komentar/${id}&${props.user._id}`)
      .then((res) =>
        sendKomentar ? setSendkomentar(false) : setSendkomentar(true)
      )
      .catch((err) => alert("error, komentar gagal dihapus!"));
  };

  const handleSendData = (data) => {
    data === ""
      ? console.log("Komentar tidak ada")
      : axios
          .post(`http://localhost:4123/komentar/`, {
            uploaderID: props.user._id,
            videoID: params.data,
            komentar: data,
          })
          .then((res) => {
            sendKomentar ? setSendkomentar(false) : setSendkomentar(true);
          })
          .catch((err) => {
            console.log("Komentar gagal dibuat!");
          });
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link Copied!");
  };

  return (
    <div className="w-[93%] mx-auto pb-10">
      <div className="relative rounded-xl overflow-hidden w-full pt-[56.25%]">
        <iframe
          src={
            video === undefined
              ? "#"
              : `https://drive.google.com/file/d/${video.urlVideoID}/preview`
          }
          className="w-full h-full absolute top-0 left-0 right-0 bottom-0  border-none"
        ></iframe>
      </div>
      <div className="mt-5">
        <div className="flex px-3 gap-3 my-4 rounded-xl py-2 bg-gray-200 dark:bg-gray-700 max-w-min">
          <button onClick={() => handleCopy(params.data)}>
            <div className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-colors  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
              </svg>
            </div>
          </button>
          <a
            href={
              video === undefined
                ? "Loading"
                : `https://drive.google.com/file/d/${video.urlVideoID}/`
            }
            download
          >
            <div className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-colors  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm5.25-9.25a.75.75 0 00-1.5 0v4.59l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V7.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </a>
        </div>

        <h3 className="font-semibold text-3xl text-gray-800 dark:text-white">
          {video === undefined ? "Loading" : video.judul}
        </h3>
        <p className="mt-2 text-gray-800 dark:text-white">
          {video === undefined ? "Loading" : video.deskripsi}
        </p>
      </div>

      <div className="mt-10 px-5 py-3 rounded-xl bg-slate-800">
        <div className="form-isian">
          <form className="flex items-end gap-5">
            <div className="grow">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="komentar"
              ></label>
              <input
                id="komentar"
                type="text"
                onChange={(e) => setMyKomentar(e.target.value)}
                placeholder="Masukkan komentar anda"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="max-h-min">
              <button
                type="button"
                onClick={() => handleSendData(myKomentar)}
                className="dark:bg-blue-400 bg-blue-400 text-white px-4 py-[.7rem] rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="form-komentar space-y-4 mt-10">
          {komentar === undefined ? (
            <div className="w-full h-full text-center text-xl font-semibold text-white/50 ">
              <p>Tidak ada Komentar, jadi yang pertama untuk berkomentar...</p>
            </div>
          ) : (
            komentar.map((data) => {
              return (
                <Komentar
                  key={data._id}
                  nama={data.uploader}
                  komentar={data.komentar}
                  id={data._id}
                  setDelete={(e) => handleOnclick(e)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(VideoContainer);
