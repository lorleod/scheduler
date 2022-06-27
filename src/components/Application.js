import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "../helpers/selectors.jsx";

import { useApplicationData } from '../hooks/useApplicationData'

// Root level of the dom tree
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // convert appointments object to array then map to jsx
  const appointmentsArray = dailyAppointments.map((appointment) => {

    return (
      <Appointment
        {...appointment}
        interviewers={dailyInterviewers}
        key={appointment.id}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        // interview={interview}
      />
    );
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray} <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
