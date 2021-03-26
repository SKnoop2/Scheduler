
export function getAppointmentsForDay (state, day) {
  // will only be one day with filtered name, so we call the first item
  const filteredDay = state.days.filter(days => days.name === day)[0]

  if (filteredDay === undefined || state.days.length === 0) { 
    return [];
  }

  // use appt id to pull details from state.appointments
  const dayAppts = filteredDay.appointments
  const appts = dayAppts.map((apptId) => state.appointments[apptId])
  
  return appts; 
};


export function getInterview (state, interview) {
  if (!interview) {
    return null;
  }

  const interviewID = interview.interviewer;

  return ({
    student: interview.student,
    interviewer: state.interviewers[interviewID]
  });
};

export function getInterviewersforDay (state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0]

  if (filteredDay === undefined || state.days.length === 0) { 
    return [];
  }

  const interviewerIds = filteredDay.interviewers
  const interviewersArr = interviewerIds.map((intId) => state.interviewers[intId])

  return interviewersArr
}
