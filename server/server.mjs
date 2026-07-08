import express from 'express';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/habits', (req, res) => {
  // Handle habit creation logic here
  req.on('data', (chunk) => {
    const habitData = JSON.parse(chunk.toString());
    console.log('Received habit data:', habitData);
    res.send('Habit created!');
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});