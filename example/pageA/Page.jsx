import React, { Component } from "react";

export default class Page extends Component {
  render() {
    let { panelNum, actions } = this.props;
    return (
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "#66CCFF" }}
      >
        PageA
      </div>
    );
  }
}
