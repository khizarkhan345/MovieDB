import React, { Component } from "react";
import Input from "./commons/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {
      username: "",
      password: "",
    },
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };

    const error = this.validateProperty(currentTarget);

    if (error) errors[currentTarget.name] = error;
    else delete errors[currentTarget.name];

    const account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            label="Username"
            value={account.username}
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={account.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
