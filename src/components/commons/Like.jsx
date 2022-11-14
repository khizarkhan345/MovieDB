import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart";

  if (!props.liked) {
    classes = classes + "-o";
  }
  return <i onClick={props.onClick} className={classes} aria-hidden="true"></i>;
};

export default Like;
