import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn" onClick={() => props.handleSaveBtn(props.bookInfo)} role="button" tabIndex="0" style={{paddingLeft: "10px"}}>
      Save {props.children}
    </span>
  );
}

export default SaveBtn;
