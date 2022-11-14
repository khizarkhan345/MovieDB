import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (column) => {
    const sortColumn = { ...this.props.sortColumn };

    if (column === sortColumn.path) {
      sortColumn.orderBy = sortColumn.orderBy === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = column;
      sortColumn.orderBy = "asc";
    }

    this.props.onSort(sortColumn);
  };

  createSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.orderBy === "asc") return <a className="fa fa-sort-asc" />;
    return <a className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              scope="col"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.createSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
