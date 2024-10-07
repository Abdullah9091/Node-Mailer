const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());

// ejs view engine 
app.set('view engine','ejs');
app.set('views', './views');




const userRoutes = require('./userRoutes/Routes');
app.use('/api', userRoutes);

//ejs view engine Route
const Authroutes = require('./userRoutes/Authroutes');
app.use('/',Authroutes);






mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));