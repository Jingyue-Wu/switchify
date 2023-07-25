import { config } from 'dotenv';
config(); // load .env file

import express from 'express';
import passport from 'passport';
import authRoutes from './routes/auth';
import cors from 'cors';
import { songName, setSongName, songList, setSongList } from './data';

import querystring from 'querystring';


require('./strategies/google'); // import passport strategy


const app = express();
const PORT = process.env.PORT;



// spotify api
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URL;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
let SCOPE = 'playlist-read-private playlist-read-collaborative';




app.get('/api/auth/spotify', (req, res) => {
    res.redirect(
        `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    );
});







// spotify data
app.use(cors());

app.use(express.json());

app.post('/', (req, res) => {

    // get name of selected playlist
    const { name, songs } = req.body;
    setSongName(name);
    console.log(songName);

    // get list of songs and artists to be searched
    setSongList(songs);
    console.log(songList);

    if (!name) {
        res.status(400).send({ status: 'failed' });
    }
    res.status(200).send({ status: 'received' });
});


app.use(passport.initialize());

// route prefix
app.use('/api/auth', authRoutes);

try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
catch (error) {
    console.log(error);
}