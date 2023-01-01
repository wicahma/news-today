import axios from "axios";
import React from "react";
import { connect } from "react-redux";

const Komentar = (props) => {
  return (
    <div className="text-gray-700 justify-between flex gap-5 items-center dark:text-gray-200">
      <div className="my-auto">
        <h4 className="font-bold">{props.nama}</h4>
        <p>{props.komentar}</p>
      </div>
      <div className="">
        {props.user.nama === props.nama ? (
          <button
            className="hover:bg-red-700 text-sm rounded-full px-3 py-1"
            onClick={() => props.setDelete(props.id)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Komentar);
