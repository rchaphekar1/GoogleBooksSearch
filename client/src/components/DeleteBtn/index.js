import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <span className="delete-btn" onClick={() => props.handleDeleteBtn(props.id)} role="button" tabIndex="0">
      {props.children}
    </span>
  );
}

export default DeleteBtn;
