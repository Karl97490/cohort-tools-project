const express = require("express")
const router = express.Router()

// COHORTS
const cohortRouter = require("./cohorts.routes.js")
router.use("/cohorts", cohortRouter)

// STUDENTS
const studentRouter = require("./students.routes.js")
router.use("/students", studentRouter)
// AUTHENTICATION
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

module.exports = router
