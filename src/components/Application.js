import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersforDay } from "helpers/selectors"

export default function Application() {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({...state, day})
  }

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
  }, [])

  function bookInterview(id, interview) {
      
    return axios.put(`/api/appointments/${id}`, {interview})
      .then (() => {
        const appointment = {...state.appointments[id], interview: {...interview}};
        const appointments = {...state.appointments, [id]: appointment};
        setState({...state, appointments });
      })
      .catch(err => console.log(err.message))
  }

  function cancelInterview (id) {
    console.log("id: ", id)
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {...state.appointments[id], interview: null};
        const appointments = {...state.appointments, [id]: appointment};
        setState({...state, appointments})
      })
      .catch(err => console.log(err.message))
  }
  
  //helper functions
  const appointments  = getAppointmentsForDay(state, state.day);
  const interviewers  = getInterviewersforDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)

      return (
        <Appointment 
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay} 
          />
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
          key="last" 
          time="5pm" 
        />
      </section>
    </main>
  );
}
