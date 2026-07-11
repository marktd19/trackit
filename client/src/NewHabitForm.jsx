import { useState } from 'react'

function NewHabitForm({ dialogRef, loadHabits, id }) {
  const [habitName, setHabitName] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [selectedDays, setSelectedDays] = useState([])
  const [notifications, setNotifications] = useState(false)
  const [motivationalMessage, setMotivationalMessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = id == '' ? 'POST' : 'PUT'
    await fetch(`http://127.0.0.1:3000/habits/${id}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            habitName: habitName,
            frequency: frequency,
            description: description,
            startDate: startDate,
            selectedDays: selectedDays,
            notifications: notifications,
            motivationalMessage: motivationalMessage
        })
    }).then(res => res.text()).then(data => { console.log(data); loadHabits() }).catch(err => console.error(err));

    dialogRef.current?.close()
  }
  return (
    <dialog ref={dialogRef}>
      <form onSubmit={handleSubmit}>
        <h1>Create a new habit</h1>
        <input
          type='text'
          placeholder='Habit Name'
          value={habitName}
          required={true}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <select name='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} required={true}>
          <option value="minutely">Minutely</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required={true}
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
        <input type="text" placeholder="Motivational message" value={motivationalMessage} required={true} onChange={(e) => setMotivationalMessage(e.target.value)} />
        <button type="submit">Create Habit</button>
      </form>
    </dialog>
  )
}

export default NewHabitForm;