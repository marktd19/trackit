import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const uri = "mongodb+srv://stretchgang:Cocojklgts1!%40@habitdb.zavxzsl.mongodb.net/?appName=HabitDB";
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'trackit3656@gmail.com',
    pass: 'cxtt slul vpsi zswz'
  }
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'marktd3656@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

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
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
      sendEmail('marktd3656@gmail.com', 'New Habit Created', `A new habit has been created: ${habitData.habitName}`);
      res.send('Habit created!');
    }).catch((err) => {
      console.error('Error saving habit to database:', err);
      res.status(500).send('Error creating habit');
    });
  });
});

app.put('/habits/:id', (req, res) => {
  req.on('data', (chunk) => {
    const updatedData = JSON.parse(chunk.toString());
    const habitId = req.params.id;
    console.log(`Received request to update habit with ID: ${habitId}`);
    Habit.findByIdAndUpdate(habitId, updatedData).then(() => {
      console.log(`Habit with ID ${habitId} updated in database`);
      res.send(`Habit with ID ${habitId} updated`);
    }).catch((err) => {
      console.error(`Error updating habit with ID ${habitId} in database:`, err);
      res.status(500).send('Error updating habit');
    });
  });
});

app.delete('/habits/:id', (req, res) => {
  const habitId = req.params.id;
  console.log(`Received request to delete habit with ID: ${habitId}`);
  Habit.findByIdAndDelete(habitId).then(() => {
    console.log(`Habit with ID ${habitId} deleted from database`);
    res.send(`Habit with ID ${habitId} deleted`);
  }).catch((err) => {
    console.error(`Error deleting habit with ID ${habitId} from database:`, err);
    res.status(500).send('Error deleting habit');
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});