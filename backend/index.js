const express = require('express');
var cors=require('cors');

const app = express();

app.use(express.json());
const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


const db = require('./src/config/db');

app.get('/',(req,res)=>{
    res.send('Helo');
})

app.use('/upload', require('./src/routes/upload'));

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

