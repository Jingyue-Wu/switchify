import { config } from 'dotenv';
config(); // load .env file

import express from 'express';
import passport from 'passport';
import authRoutes from './routes/auth';


require('./strategies/google'); // import passport strategy


const app = express();
const PORT = process.env.PORT;


app.use(passport.initialize());


// route prefix
app.use('/api/auth', authRoutes);

try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
catch (error) {
    console.log(error);
}






// import { config } from 'dotenv';
// config(); // load .env file

// import express from 'express';
// import passport from 'passport';
// import authRoutes from './routes/auth';
// require('./strategies/google'); // import passport strategy

// const app = express();
// const PORT = process.env.PORT;

// app.use(passport.initialize());

// // route prefix
// app.use('/api/auth', authRoutes);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// try {
// }
// catch (error) {
//     console.log(error);
// }



// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import { google } from 'googleapis';
// import dotenv from 'dotenv';
// import axios from 'axios';

// dotenv.config();

// const app = express();
// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } = process.env;
// const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

// // Redirect URL after successful Google login
// const redirectURL = GOOGLE_REDIRECT_URL;

// app.get('/api/auth/google', (req: Request, res: Response) => {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: [
//             'email',
//             'profile',
//             'https://www.googleapis.com/auth/youtube',
//             'https://www.googleapis.com/auth/youtube.force-ssl',
//         ],
//         redirect_uri: redirectURL,
//     });

//     res.redirect(authUrl);
// });

// app.get('/api/auth/google/callback', async (req: Request, res: Response) => {
//     const code = req.query.code as string;

//     try {
//         const { tokens } = await oAuth2Client.getToken(code);
//         oAuth2Client.setCredentials(tokens);

//         app.listen(PORT, () => {
//             console.log(tokens?.access_token);
//         });


//         //----------------------------

//         let data = JSON.stringify({
//             "snippet": {
//                 "title": "balls",
//                 "description": "test test test"
//             }
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'https://www.googleapis.com/youtube/v3/playlists?part=id,snippet',
//             headers: {
//                 'Authorization': 'Bearer ' + tokens?.access_token,
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         };

//         axios.request(config)
//             .then((response) => {
//                 console.log(JSON.stringify(response.data));
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//         //----------------------------



//         // Call the function to create the YouTube playlist using the tokens.access_token
//         const accessToken = 'Bearer ' + tokens?.access_token; // Safe access with optional chaining

//         if (!accessToken) {
//             res.status(500).json({ error: 'Access token is missing or invalid.' });
//             return;
//         }

//         const playlistId = await createYouTubePlaylist(accessToken);

//         res.json({ playlistId });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to authenticate with Google.' });
//     }
// });

// async function createYouTubePlaylist(accessToken: string) {
//     try {
//         // Replace with the title and description of your desired playlist
//         const playlistTitle = 'My New Playlist';
//         const playlistDescription = 'This is my new playlist created through the API';

//         const youtube = google.youtube({
//             version: 'v3',
//             auth: accessToken,
//         });

//         const playlistResponse = await youtube.playlists.insert({
//             part: ['snippet'],
//             requestBody: {
//                 snippet: {
//                     title: playlistTitle,
//                     description: playlistDescription
//                 },
//             },
//         });

//         return playlistResponse.data.id;
//     } catch (error) {
//         console.error('Error creating YouTube playlist:', error);
//         throw error;
//     }
// }

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });