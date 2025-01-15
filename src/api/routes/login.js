const express = require('express');
const { singUpIn } = require('../controllers/login')

const loginRoutes = express.Router({ mergeParams: true });

loginRoutes.post('/sing-up-in', singUpIn);

module.exports = loginRoutes;