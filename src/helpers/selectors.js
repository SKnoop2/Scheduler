
export function getAppointmentsForDay (state, day) {
  // there will only be one day with that filtered name, so we call pull monday out of the obj
  const filteredDay = state.days.filter(days => days.name === day)[0]

  // if days array is empty or a word is entered for days that does not exist in days array
  if (filteredDay === undefined || state.days.length === 0) { 
    return [];
  }

  // appt ids for selected day
  const dayAppts = filteredDay.appointments
  // use appt ids to pull out the appt details from the state.appointments
  const appts = dayAppts.map((apptNum) => state.appointments[apptNum])
  // console.log("appointments:", appts)
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
  // console.log(interviewersArr)
  return interviewersArr
  
}
