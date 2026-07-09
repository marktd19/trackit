import express from 'express';
import mongoose from 'mongoose';

const uri = "mongodb+srv://stretchgang:Cocojklgts1!%40@habitdb.zavxzsl.mongodb.net/?appName=HabitDB";
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const schema = new mongoose.Schema({
  habitName: String,
  frequency: String,
  description: String,
  startDate: Date,
  selectedDays: [String],
  notifications: Boolean,
  motivationalMessage: String
});

const Habit = mongoose.model('Habit', schema);

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  Habit.find({}).then((habits) => {
    res.json(habits);
  }).catch((err) => {
    console.error('Error fetching habits from database:', err);
    res.status(500).send('Error fetching habits');
  })
});

app.post('/habits', (req, res) => {
  // Handle habit creation logic here
  req.on('data', (chunk) => {
    const habitData = JSON.parse(chunk.toString());
    console.log('Received habit data:', habitData);
    const newHabit = new Habit(habitData);
    newHabit.save().then(() => {
      console.log('Habit saved to database');
      res.send('Habit created!');
    }).catch((err) => {
      console.error('Error saving habit to database:', err);
      res.status(500).send('Error creating habit');
    });
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});