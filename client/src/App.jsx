import { useState, useRef, useEffect } from 'react'
import NewHabitForm from './NewHabitForm'
import './App.scss'

function App() {
  const [habitList, setHabitList] = useState([])
  const dialogRef = useRef(null)
  const loadHabits = async () => {
    await fetch('http://127.0.0.1:3000/')
      .then(res => res.json())
      .then(data => setHabitList(data))
      .catch(err => console.error('Error fetching habits:', err));
  };
  const openDialog = () => {
    dialogRef.current?.showModal()
  }
  useEffect(() => {
    loadHabits()
  }, [])
  return (
    <>
      <div id="list-box">
        {habitList.map((habit) => (
          <HabitEntry key={habit._id} habit={habit} loadHabits={loadHabits}/>
        ))}
      </div>

      <button id="newButton" onClick={openDialog}>
        Start a new habit!
      </button>
      <NewHabitForm dialogRef={dialogRef} loadHabits={loadHabits} id=''/>
    </>
  )
}

function HabitEntry({ habit, loadHabits }) {
  const dialogRef = useRef(null);
  const openDialog = () => {
    dialogRef.current?.showModal()
  }
  return (
    <div className="habit-component">
      <h2 className="habit-name">{habit.habitName}</h2>
      <p className="frequency">Frequency: {habit.frequency}</p>
      <p className="description">Description: {habit.description}</p>
      <p className="start-date">Start Date: {new Date(habit.startDate).toLocaleDateString()}</p>
      <p className="selected-days">Selected Days: {habit.selectedDays.join(', ')}</p>
      <p className="notifications">Notifications: {habit.notifications ? 'Enabled' : 'Disabled'}</p>
      <p className="motivational-message">Motivational Message: {habit.motivationalMessage}</p>
      <button className="edit-button" onClick={() => {
        openDialog()
      }}>
        Edit
      </button>
      <button className="delete-button" onClick={
        async () => {
          await fetch(`http://localhost:3000/habits/${habit._id}`, {
            method: 'DELETE'
          });
          window.location.reload();
        }}>
        Delete
      </button>
      <NewHabitForm dialogRef={dialogRef} loadHabits={loadHabits} id={habit._id}/>
    </div>
  )
}

export default App
