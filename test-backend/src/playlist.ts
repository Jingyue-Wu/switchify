import axios from 'axios';

export default function playlist(token: any) {
    let data = JSON.stringify({
        "snippet": {
            "title": "balls3",
            "description": "test test test"
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
        })
        .catch((error) => {
            console.log(error);
        });
}