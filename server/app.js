process.loadEnvFile()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5005
const CLIENT_PORT = process.env.CLIENT_PORT || 5173

const mongoose = require('mongoose')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Cohort = require('./models/Cohorts.model') // Model Cohort from the models folder and Cohorts.model.js
const Student = require('./models/Students.model')

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express()

mongoose
  .connect('mongodb://127.0.0.1:27017/cohort-tools-api')
  .then((x) =>
    console.log(`Connected to the database ${x.connections[0].name}`),
  )
  .catch((error) => console.log(`Connection error${error}`))

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

//Cohorts Routes
app.get('/api/cohorts', (req, res) => {
  // res.json(cohorts)
  Cohort.find({})
    .then((cohorts) => {
      // console.log("Retrieved books ->", books);
      res.json(cohorts)
    })
    .catch((error) => {
      // console.error("Error while retrieving books ->", error);
      res.status(500).json({ error: 'Failed to retrieve books' })
    })
})

app.get('/api/cohorts/:cohortId', async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

app.post('/api/cohorts', async (req, res) => {
  console.log(req.body)
  try {
    const response = await Cohort.create(req.body)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.delete('/api/cohorts/:cohortId', async (req, res) => {
  try {
    const response = await Cohort.findByIdAndDelete(req.params.cohortId)
    // res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.put('/api/cohorts/:cohortId', async (req, res) => {
  try {
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true },
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

// Students Routes
app.get('/api/students', (req, res) => {
  Student.find({})
    .then((students) => {
      res.json(students)
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
})

app.get('/api/students/cohort/:cohortId', async (req, res) => {
  try {
    // Student.find({cohort: })
    const response = await Student.find({ cohort: req.params.cohortId })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/students/:studentId', async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/students', async (req, res) => {
  try {
    const response = await Student.create(req.body)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

app.put('/api/students/:studentId', async (req, res) => {
  try {
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true },
    )
    res.json(response)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

app.delete('/api/students/:studentId', async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
