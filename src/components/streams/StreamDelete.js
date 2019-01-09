import React from "react";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDismiss = () => {
    history.push("/");
  };

  renderActions() {
    //Instead of React.Fragment we can use empty tag
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
        >
          Delete
        </button>
        <button className="ui button" onClick={this.onDismiss}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.stream) return <div>Loading...</div>;
    return (
      <div>
        <Modal
          header="Delete Stream"
          content={`Are you sure want to delete ${
            this.props.stream.title
          } stream?`}
          actions={this.renderActions()}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { deleteStream, fetchStream }
)(StreamDelete);
