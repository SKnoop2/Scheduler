import React from "react";
import "./styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // used in form component below, captures name & interviewer to save to database
  function onSave(name, interviewer) {
    const interview = {student: name, interviewer};

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    // add true below to replace existing mode so to skip confirmation screen & go back to SHOW
    .catch(error => transition(ERROR_SAVE, true));
  };

  // flow of events that happen upon hiting delete button
  function onDelete() {
    
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  };

  function onConfirm() {
    transition(CONFIRM);
  }

  function onEdit() {
    transition(EDIT)
  }


  console.log("props in index: ", props)

  return (
  <article className="appointment">
    <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
          onDelete={() => onConfirm()}
          onEdit={() => onEdit()}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete" onCancel={() => back()} onConfirm={() => onDelete()} />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={onSave} 
        />
      )}
      {mode === ERROR_DELETE && <Error message="Could not delete your appointment. Please try again." />}
      {mode === ERROR_SAVE && <Error message="Could not save your appointment. Please try again." />}
  </article>)
}