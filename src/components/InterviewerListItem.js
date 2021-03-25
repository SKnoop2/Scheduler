import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  const interviewClass = classNames ("interviewers__item", {
    "interviewers__item-image": props.image,
    "interviewers__item--selected": props.selected,
  });

  const formatSelected = () => (props.selected ? props.name : "")

  return (

    <li
      className={interviewClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {formatSelected()}
    </li>
  )
}