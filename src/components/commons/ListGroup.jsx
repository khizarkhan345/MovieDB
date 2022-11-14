import React from "react";
import { genres } from "../../services/fakeGenreService";

const ListGroup = (props) => {
  const {
    genreList,
    onGenreSelect,
    textProperty,
    valueProperty,
    selectedItem,
  } = props;
  return (
    <ul className="list-group">
      {genreList.map((genre) => (
        <li
          key={genre[textProperty]}
          className={
            genre === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelect(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
