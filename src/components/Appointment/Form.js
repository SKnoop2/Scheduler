import React, {useState} from "react";
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
  
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    
    setError("");
    props.onSave(name, interviewer);
  }

  const formID = props.id || "interview-form";

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" id={formID} onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name">Student Name</label>
          <input
            required
            id="name"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} type="reset" form={formID}>Cancel</Button>
          <Button confirm onClick={validate} type="submit" form={formID}>Save</Button>
        </section>
      </section>
    </main>
  )
}