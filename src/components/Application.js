import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors.jsx";

// Root level of the dom tree
export default function Application(props) {

  //Create state object for storing all DOM state date
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Function passed down in props to DayListItem to change day in state when a day (ie tuesday) is clicked on. Takes in day.
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  //get requests to api to populate state on first render of page
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Passed as prop down to Appointment then Form. Called when new appointmnet made.
  // Builds new interview object, then updates database and then updates state
  // Takes in appointment id and interview object
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(() => ({
        ...state,
        appointments,
      }));
    });
  }

  //Passed as prop down to Appointment then Show. Called when delete button clicked.
  // Builds apppointment with null interview then updates database then updates state
  // Takes in appointment id
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(() => ({
        ...state,
        appointments,
      }));
    });
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // convert appointments object to array then map to jsx
  const appointmentsArray = dailyAppointments.map((appointment) => {
    // const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        {...appointment}
        interviewers={dailyInterviewers}
        key={appointment.id}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
