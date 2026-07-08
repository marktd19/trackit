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
    await fetch('http://127.0.0.1:3000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: habitName,
        frequency: frequency,
        description: description,
        startDate: startDate,
        selectedDays: selectedDays,
        notifications: notifications,
        motivationalMessage: motivationalMessage
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
          <select name='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)}>
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
              <input type="checkbox" name="days" value="monday" checked={selectedDays.includes('monday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'monday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'monday'))
                }
              }} />
              Monday
            </label>
            <label>
              <input type="checkbox" name="days" value="tuesday" checked={selectedDays.includes('tuesday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'tuesday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'tuesday'))
                }
              }} />
              Tuesday
            </label>
            <label>
              <input type="checkbox" name="days" value="wednesday" checked={selectedDays.includes('wednesday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'wednesday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'wednesday'))
                }
              }} />
              Wednesday
            </label>
            <label>
              <input type="checkbox" name="days" value="thursday" checked={selectedDays.includes('thursday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'thursday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'thursday'))
                }
              }} />
              Thursday
            </label>
            <label>
              <input type="checkbox" name="days" value="friday" checked={selectedDays.includes('friday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'friday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'friday'))
                }
              }} />
              Friday
            </label>
            <label>
              <input type="checkbox" name="days" value="saturday" checked={selectedDays.includes('saturday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'saturday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'saturday'))
                }
              }} />
              Saturday
            </label>
            <label>
              <input type="checkbox" name="days" value="sunday" checked={selectedDays.includes('sunday')} onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, 'sunday'])
                } else {
                  setSelectedDays(selectedDays.filter(day => day !== 'sunday'))
                }
              }} />
              Sunday
            </label>
          </fieldset>
          <label>
            <input type="checkbox" name="notifications" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            Send text notifications
          </label>
          <input type="text" placeholder="Motivational message" value={motivationalMessage} onChange={(e) => setMotivationalMessage(e.target.value)} />
          <button type="submit">Create Habit</button>
        </form>
      </dialog>
    </>
  )
}


export default App
