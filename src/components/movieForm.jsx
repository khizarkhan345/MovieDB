import React, { Component } from "react";
import Input from "./commons/input";
import Select from "./commons/select";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Component {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10),
  };

  componentDidMount() {
    const genres = getGenres();

    this.setState({ genres: genres });

    const movieId = this.props.match.params.id;

    if (movieId === "new") return;

    const movie = getMovie(movieId);

    if (!movie) return this.props.history.replace("/notfound");

    this.setState({ data: this.mapToViewModal(movie) });
  }

  mapToViewModal = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };

    const error = this.validateProperty(currentTarget);

    if (error) errors[currentTarget.name] = error;
    else delete errors[currentTarget.name];

    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const errors = {};
    const options = { abortEarly: false };
    const data = this.state.data;
    const { error } = Joi.validate(data, this.schema, options);

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

    this.doSubmit();
    //console.log("submitted!");
    //console.log(this.state.data);
  };

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  render() {
    const { data, genres, errors } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="title"
            label="Title"
            value={data.title}
            error={errors.title}
            onChange={this.handleChange}
          />
          <Select
            name={"genreId"}
            value={data["genreId"]}
            label="Genre"
            options={genres}
            onChange={this.handleChange}
            error={errors["genreId"]}
          />

          <Input
            type="number"
            name="numberInStock"
            label="Number In Stock"
            value={data.numberInStock}
            error={errors.numberInStock}
            onChange={this.handleChange}
          />
          <Input
            type="number"
            name="dailyRentalRate"
            label="Daily Rental Rate"
            value={data.dailyRentalRate}
            error={errors.dailyRentalRate}
            onChange={this.handleChange}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
