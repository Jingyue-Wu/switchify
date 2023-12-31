import axios from 'axios';
import { songList } from './data';

const songLimit = 10;

export default function playlist(token: any, songName: string) {

    let playlistId: string = '';

    let data = JSON.stringify({
        "snippet": {
            "title": songName,
            "description": "Playlist generated by Switchify"
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.googleapis.com/youtube/v3/playlists?part=id,snippet',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            playlistId = response.data.id;
            addSongsToPlaylist(token, playlistId);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function searchVideos(token: any, songName: string, artist: string) {
    try {
        const searchQuery = `${songName} ${artist} audio`;
        const maxResults = 1;
        const part = 'snippet';
        const type = 'video';

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: searchQuery,
                maxResults,
                part,
                type,
                key: process.env.YOUTUBE_DATA_API_KEY
            },
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });

        const videoId = response.data.items[0]?.id?.videoId;
        return videoId;
    } catch (error) {
        console.log(error);
        console.log(songName, artist);
        return null;
    }
}

// async function addSongsToPlaylist(token: any, playlistId: string) {
//     try {
//         for (const song of songList) {
//             const videoId = await searchVideos(token, song.name, song.artist);
//             if (videoId) {
//                 await addVideoToPlaylist(token, playlistId, videoId);
//             } else {
//                 console.log(`No video found for ${song.name} by ${song.artist}`);
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


async function addSongsToPlaylist(token: any, playlistId: string) {
    try {
        for (let i = 0; i < songLimit; i++) {
            const videoId = await searchVideos(token, songList[i].name, songList[i].artist);
            if (videoId) {
                await addVideoToPlaylist(token, playlistId, videoId);
            } else {
                console.log(`No video found for ${songList[i].name} by ${songList[i].artist}`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addVideoToPlaylist(token: any, playlistId: string, videoId: string) {
    try {
        const data = JSON.stringify({
            "snippet": {
                "playlistId": playlistId,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": videoId
                }
            }
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config);
        console.log(`Added video with ID ${videoId} to the playlist`);
    } catch (error) {
        console.log(error);
    }
}