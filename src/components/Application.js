import React, { useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Kim Possible",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Ron Stoppable",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg" ,
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Rufus The Naked Mole Rat",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];

export default function Application() {
  const [day, setDay] = useState("Monday");

  const mappedAppts = appointments.map(appointments => {
    return (
      <Appointment 
        key={appointments.id}
        {...appointments}
      />
    )
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList
          days={days}
          day={day}
          setDay={setDay} />
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
