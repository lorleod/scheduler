

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