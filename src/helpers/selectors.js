

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
  return appts; 
};


// interview data:
// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     }
//   }
// }

// interviewer data:
// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": 1
//   }
// }

// This function will return an object that contains the interview data if it is passed an object that contains an interviewer.
// returned object should look like this:
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }


// console.log("interview: ", interview) 
    // >> interview:  { student: 'Archie Cohen', interviewer: 2 }


export function getInterview (state, interview) {
  
  if (!interview) {
    return null;
  }

  const interviewID = interview.interviewer

  return ({
    student: interview.student,
    interviewer: state.interviewers[interviewID]
  });

}


// if (state.appointments[appointmentid].interview === null) {
//   return null
// }
