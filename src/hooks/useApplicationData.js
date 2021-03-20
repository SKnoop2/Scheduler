export default function useApplicationData() {

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
  }

  function cancelInterview (id) {
    console.log("id: ", id)
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {...state.appointments[id], interview: null};
        const appointments = {...state.appointments, [id]: appointment};
        setState({...state, appointments})
      })
  }
  
  const interview = getInterview(state, appointment.interview)
}