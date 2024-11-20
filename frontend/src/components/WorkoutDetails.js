const WorkoutDetails = ({w})=>{
  return(
    <div className="workout-details">
      <h4>{w.title}</h4>
      <p><strong>Reps:</strong> {w.reps}</p>
      <p><strong>Load (Kg):</strong> {w.load}</p>
      <p>{w.createdAt}</p>
    </div>
  )
}

export default WorkoutDetails