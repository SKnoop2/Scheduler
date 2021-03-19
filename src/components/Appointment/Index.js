import React from "react";
import "./styles.scss";
import Confirm from "./Confirm"
import Empty from "./Empty"
import Error from "./Error"
import Form from "./Form"
import Header from "./Header"
import Show from "./Show"
import useVisualMode from "../../hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const showAppt = () => (
    props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer} />) : <Empty />
  )

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  let interviewers=[]

  return (
  <article className="appointment">
    <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          name={props.name}
          value={props.name}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
        />
      )}
      {/* {mode === CREATE && <Form onClick={(cancel) => back()} />} */}
  </article>)
}