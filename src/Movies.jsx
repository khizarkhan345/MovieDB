import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import { Link } from "react-router-dom";
import Like from "./components/commons/Like";
import MoviesTable from "./components/MoviesTable";
import Pagination from "./components/commons/PaginationComp";
import { paginate } from "./utils/paginate";
import ListGroup from "./components/commons/ListGroup";
import MovieForm from "./components/movieForm";
import _ from "lodash";
import SearchForm from "./components/searchForm";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchTerm: "",
    sortColumn: { path: "title", orderBy: "asc" },
    selectedGenre: null,
  };

  componentDidMount() {
    const genre = [{ name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genre });
  }

  handleDelete = (id) => {
    this.setState((prevState) => ({
      movies: prevState.movies.filter((movie) => {
        return id !== movie._id;
      }),
    }));
  };

  handleHeartColor = (id) => {
    const index = this.state.movies.findIndex((movie) => movie._id === id);
    let moviess = { ...this.state.movies };

    moviess[index].liked = !moviess[index].liked;
    this.setState({ moviess });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchTerm: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchTerm = (searchText) => {
    this.setState({ searchTerm: searchText });
  };

  getSortedData = () => {
    const {
      pageSize,
      currentPage,
      movies: Allmovies,
      selectedGenre,
      sortColumn,
      searchTerm,
      genres,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? Allmovies.filter((m) => m.genre._id === selectedGenre._id)
        : Allmovies;

    const filteredSearch =
      filtered &&
      Allmovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const finalData = searchTerm.length === 0 ? filtered : filteredSearch;
    const sorted = _.orderBy(
      finalData,
      [sortColumn.path],
      [sortColumn.orderBy]
    );
    const movies = paginate(sorted, currentPage, pageSize);

    return { TotalCount: filtered.length, data: movies };
  };
  render() {
    console.log(this.state.searchTerm);
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: Allmovies,
      searchTerm,
      selectedGenre,
      sortColumn,
      genres,
    } = this.state;

    const { TotalCount, data: movies } = this.getSortedData();

    if (this.state.movies.length === 0) {
      return <p className="m-2">There are no movies in the database.</p>;
    }

    return (
      <main className="container">
        <div className="row m-2">
          <div className="col-3">
            <ListGroup
              genreList={genres}
              selectedItem={selectedGenre}
              onGenreSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-md">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: "20px" }}
            >
              New Movie
            </Link>
            <p className="m-2">Showing {TotalCount} in the database.</p>
            <SearchForm handleSearchTerm={this.handleSearchTerm} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              searchTerm={searchTerm}
              onLike={this.handleHeartColor}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={TotalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
