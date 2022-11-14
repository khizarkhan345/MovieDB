import React, { Component } from "react";
import Input from "./commons/input";
import Joi from "joi-browser";

class RegisterForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
      name: "",
    },
    errors: {
      username: "",
      password: "",
      name: "",
    },
  };

  schema = {
    username: Joi.string().email().label("Email").required(),
    password: Joi.string().min(5).max(30).label("Password").required(),
    name: Joi.string().required(),
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

    console.log("submitted!");
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
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
          <Input
            type="text"
            name="name"
            label="Name"
            value={account.name}
            error={errors.name}
            onChange={this.handleChange}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
