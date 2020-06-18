const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/api/users');
const app = express();
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());
connectDB();
app.use(passport.initialize());
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
