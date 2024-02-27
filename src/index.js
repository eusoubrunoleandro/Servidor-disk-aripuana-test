require('dotenv').config();
const express = require('express');
const cors = require('cors')
const App = express();

const bodyParser = require('body-parser')

const Router = require('./Router')

App.use(cors({
    origin:"*"
}));
App.use(bodyParser.json())
App.use(Router)

App.listen(process.env.PORT || 3333)
