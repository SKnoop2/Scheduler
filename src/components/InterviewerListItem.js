import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  const interviewClass = classNames ("interviewers__item", {
    "interviewers__item-image": props.image,
    "interviewers__item--selected": props.selected,
  });

  const formatSelected = () => (props.selected ? props.name : "");

  return (

    <li
      className={interviewClass}
      onClick={props.setInterviewer}
    >
      <label htmlFor={`Interviewer - ${props.name}`}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {formatSelected()}
      </label>
      <input 
      className="interviewers__radio-button"
      type="radio" 
      name="interviewer" 
      required id={`Interviewer - ${props.name}`} 
      checked={props.selected} 
      value={props.name}/>
    </li>
  )
}