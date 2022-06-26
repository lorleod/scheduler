import { useState, useEffect } from 'react';
import axios from "axios";

export function useApplicationData() {
  //Create state object for storing all DOM state date
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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

  //Function passed down in props to DayListItem to change day in state when a day (ie tuesday) is clicked on. Takes in day.
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  //day, "up" or "down"
  function updateSpots(upOrDown) {
    let spotChange = 1;
    if (upOrDown === "down") {
      spotChange = -1;
    }

    for (let day of state.days) {
      if (day.name === state.day) {
        const updatedDay = {
            ...day,
            spots: day.spots + spotChange,
          };
        const updatedDays = [
          ...state.days
        ]
        updatedDays[state.days.indexOf(day)] = updatedDay;
        console.log("state.days.indexOf(day): ", state.days.indexOf(day));
        console.log("updatedDays: ", updatedDays);
        setState((prev) => ({
          ...prev,
          days: updatedDays,
        }));

      }
    }
  }

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

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(() => ({
        ...state,
        appointments,
      }));

      updateSpots("down");
    })
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

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState(() => ({
        ...state,
        appointments,
      }));
      updateSpots("up");
    })
  }

  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview
  })
};
