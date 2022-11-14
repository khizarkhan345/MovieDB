import React, { Component } from "react";
import Input from "./commons/input";
import Joi from "joi-browser";
class SearchForm extends Component {
  state = {
    searchText: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ searchText: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.handleSearchTerm(this.state.searchText);
    this.setState({ searchText: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-outline">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default SearchForm;
