const express = require('express')
const app = express()

const github = require('../controllers/githubController')

app.use('/github', github)

module.exports = app