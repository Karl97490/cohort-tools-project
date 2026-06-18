const express = require('express')
const router = express.Router()

// COHORTS
const cohortRouter = require("./cohorts.routes.js")
router.use("/cohorts", cohortRouter)

// STUDENTS
const studentRouter = require("./students.routes.js")
router.use("/students", studentRouter)


module.exports = router