import React from "react";
import { connect } from "react-redux";
const StreamEdit = props => {
  return <div>{props.stream.title}</div>;
};

const mapStateToProps = (state, { match }) => {
  return { stream: state.streams[match.params.id] };
};

export default connect(mapStateToProps)(StreamEdit);