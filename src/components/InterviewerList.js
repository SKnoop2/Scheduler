import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  console.log(props)
  // loop through the interview list items to show list in html
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar}
        // Stories shows us the preselected item has an id where as initial doesn't, therefor selecting on id
        selected={interviewer.id === props.value} 
        //being passed down to interview list item & no longer need to pass the id down to list item
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

