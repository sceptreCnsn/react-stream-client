import React from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux';
import {createStream} from '../../actions';

class StreamCreate extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          {error}
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
      const response = this.props.createStream(formValues);
  }

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Desription"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValue => {
  const errors = {};
  if (!formValue.title) {
    errors.title = "You must enter a title";
  }

  if (!formValue.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped  = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);
