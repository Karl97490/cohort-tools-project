process.loadEnvFile()

 
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5005
const CLIENT_PORT = process.env.CLIENT_PORT || 5173

const mongoose = require('mongoose')
const Cohort = require('./models/Cohorts.model') // Model Cohort from the models folder and Cohorts.model.js


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require('./data/cohorts.json')
const students = require('./data/students.json')

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/cohort-tools-api')
  .then(x => console.log(`Connected to the database ${x.connections[0].name}`))
  .catch(error => console.log(`Connection error${error}`))
  
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    origin: [`http://localhost:${CLIENT_PORT}`], // Add the URLs of allowed origins to this array
  }),
)

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get('/docs', (req, res) => {
  res.sendFile(__dirname + '/views/docs.html')
})


app.get('/api/cohorts', (req, res) => {
  // res.json(cohorts)
  Cohort.find({})
  .then((cohorts) => {
    // console.log("Retrieved books ->", books);
    res.json(cohorts);
  })
  .catch((error) => {
    // console.error("Error while retrieving books ->", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  });
})

app.get('/api/students', (request, response) => {
  response.json(students)
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})