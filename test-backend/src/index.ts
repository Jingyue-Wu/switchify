import { config } from 'dotenv';
config(); // load .env file

import express from 'express';
import passport from 'passport';
import authRoutes from './routes/auth';
import axios from 'axios';
import cors from 'cors';
import { songName, setSongName } from './data';

require('./strategies/google'); // import passport strategy


const app = express();
const PORT = process.env.PORT;


// spotify data
app.use(cors());

app.use(express.json());

app.post('/', (req, res) => {
    const { name } = req.body;

    setSongName(name);
    console.log(songName);


    if (!name) {
        res.status(400).send({ status: 'failed' });
    }
    res.status(200).send({ status: 'received' });
});


// google oauth
app.use(passport.initialize());

// route prefix
app.use('/api/auth', authRoutes);

try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
catch (error) {
    console.log(error);
}