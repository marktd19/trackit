import { useState, useRef } from 'react'
import './App.css'

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [habitName, setHabitName] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [notifications, setNotifications] = useState(false)
  const [motivationalMessage, setMotivationalMessage] = useState('')

  const openDialog = () => {
    dialogRef.current?.showModal()
  }
  
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('http://127.0.0.1:3000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: habitName,
        frequency,
        description,
        startDate,
        selectedDays,
        notifications,
        motivationalMessage
      }),
    }).then(res => res.text()).then(data => console.log(data)).catch(err => console.error(err));
    dialogRef.current?.close()
  }

  return (
    <>
      <button onClick={openDialog}>
        Start a new habit!
      </button>
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <h1>Create a new habit</h1>
          <input 
            type='text' 
            placeholder='Habit Name' 
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
          <select name='Frequency'>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input 
            type="text" 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input 
            type="date" 
            placeholder="Start Date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <fieldset>
            <legend>Select Days</legend>
            <label>
              <input type="checkbox" name="days" value="monday" />
              Monday
            </label>
            <label>
              <input type="checkbox" name="days" value="tuesday" />
              Tuesday
            </label>
            <label>
              <input type="checkbox" name="days" value="wednesday" />
              Wednesday
            </label>
            <label>
              <input type="checkbox" name="days" value="thursday" />
              Thursday
            </label>
            <label>
              <input type="checkbox" name="days" value="friday" />
              Friday
            </label>
            <label>
              <input type="checkbox" name="days" value="saturday" />
              Saturday
            </label>
            <label>
              <input type="checkbox" name="days" value="sunday" />
              Sunday
            </label>
          </fieldset>
          <label>
            <input type="checkbox" name="notifications" />
            Send text notifications
          </label>
          <input type="text" placeholder="Motivational message"></input>
          <button type="submit">Create Habit</button>
        </form>
      </dialog>
    </>
  )
}


export default App
