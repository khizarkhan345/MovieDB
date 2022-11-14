import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./tableBody";

function Table(props) {
  const { movies, columns, sortColumn, onSort } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={columns} />
    </table>
  );
}

export default Table;
