import React, { Component } from "react";
import VideoContainer from "../../components/watch/VideoContainer";

export class Watch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="pt-10">
    <VideoContainer/>
    </div>;
  }
}

export default Watch;
