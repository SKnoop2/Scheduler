import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // state for selected day
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = day => setState({...state, day});

  // get then update data for days, appointments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data}));
      });
  }, []);
  
  // count unbooked appointments
  const availableSpots = function(day, appointments) {
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++
      }
    }
    return count;
  }
  
  // show number of available spots in the days array
  const updatedSpotsArr = (days, appointments) => {
    const newArray = days.map((day) => ({
      ...day, 
      spots: availableSpots(day, appointments) 
    }))
    return newArray;
  };

  // update state when booking an appointment
  function bookInterview(id, interview) {
      
    return axios.put(`/api/appointments/${id}`, {interview})
      .then (() => {
        // copy existing appointment data, and add on supplied interview data
        const appointment = {...state.appointments[id], interview: {...interview}};
        // add new appointment ID to existing data
        const appointments = {...state.appointments, [id]: appointment};
        // insert new value for days in setState to update number of spots available
        setState({...state, appointments, days:updatedSpotsArr(state.days, appointments) });
      })
  }

  // update state when deleting an apppointment
  function cancelInterview(id) {
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // replace existing interview with null when deleting
        const appointment = {...state.appointments[id], interview: null};
        const appointments = {...state.appointments, [id]: appointment};
        setState({...state, appointments, days:updatedSpotsArr(state.days, appointments)})
      })
  }

  return {
    state, 
    setDay, 
    bookInterview, 
    cancelInterview
  }
}