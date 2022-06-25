

export function getAppointmentsForDay (state, day) {

  const daysArray = state.days;
  const appointmentsObj = state.appointments;
  const appointmentsArray = [];

  for (const arrDay of daysArray) {
    if (arrDay.name === day) {
      for (let appointmentId of arrDay.appointments) {
        appointmentsArray.push(appointmentsObj[appointmentId]);
      }
    }
  }
  return appointmentsArray;
};

export function getInterviewersForDay (state, day) {
  const daysArray = state.days;
  const interviewersObj = state.interviewers;
  const interviewersArray = [];

  for (const arrDay of daysArray) {
    if (arrDay.name === day) {
      for (let interviewerId of arrDay.interviewers) {
        interviewersArray.push(interviewersObj[interviewerId]);
      }
    }
  }
  return interviewersArray;
};

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  return ({
    "student": interview.student,
    "interviewer": {
      "id": interview.interviewer,
      "name": state.interviewers[interview.interviewer].name,
      "avatar": state.interviewers[interview.interviewer].avatar
    }
  })
};