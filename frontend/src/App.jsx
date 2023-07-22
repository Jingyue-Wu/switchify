import './App.css';
import { useEffect, useState } from 'react';


function App() {

    // Spotify Auth

    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:5173";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    let SCOPE = 'playlist-read-private playlist-read-collaborative';
    const [token, setToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (hash) {
            console.log("Logged In");
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }
        setToken(token);
    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token", token);
        location.reload();
    };


    //Get User ID

    let user_id = "";

    const getUserInfo = async () => {
        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                user_id = data.id;
                console.log(user_id);
                getPlaylists();
            }
            else {
                console.log("Error");
            }
        }
        catch (error) {
            console.log("Error:", error);
        }
    };


    //Search
    const [playlists, setPlaylists] = useState([]);

    const getPlaylists = async () => {
        try {
            const response = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // const id = data.items.map((playlist) => playlist.id);
                setPlaylists(data.items);
            }
            else {
                console.log("Error");
            }
        }
        catch (error) {
            console.log("Error:", error);
        }
    };


    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, [token]);


    const [songs, setSongs] = useState([]);

    const [songsWithArtists, setSongsWithArtists] = useState([]);


    const searchSongs = async (id) => {
        try {
            const limit = 100;
            let offset = 0;
            let allSongs = [];
            let filteredSongs = [];

            for (; ;) {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${offset}&additional_types=track%2Cepisode&market=from_token&include_artist_names=true`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.items && data.items.length > 0) {
                        allSongs = [...allSongs, ...data.items];
                        offset += limit;
                    } else {
                        break;
                    }
                } else {
                    console.log("Error");
                    break;
                }
            }

            const songsWithArtists = allSongs.filter((song) => song.track && song.track.name !== null && song.track.artists && song.track.artists.length > 0).map((song) => {
                return {
                    name: song.track.name,
                    artist: song.track.artists[0].name
                };
            });
            setSongsWithArtists(songsWithArtists);

            filteredSongs = allSongs.filter((song) => song.track && song.track.name !== null && song.track.artists && song.track.artists.length > 0);
            setSongs(filteredSongs);

            console.log(songsWithArtists);

        } catch (error) {
            console.log("Error:", error);
        }
    };


    return (
        <>
            {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> :
                <button className="underline" onClick={logout}>Logout</button>}

            <h1 className='font-bold'>Select Playlist:</h1>
            <ul>
                {playlists.map(playlist => <li key={playlist.id}><button onClick={() => searchSongs(playlist.id)}>{playlist.name}</button></li>)}
            </ul>

            <br />
            <h1 className='font-bold'>Songs to be transferred:</h1>
            <ul>
                {songs.map((song, index) => (<li key={`${song.track.id}_${index}`}>{song.track.name}</li>))}
            </ul>

            {songsWithArtists.length > 0 && <a className="underline text-xl bg-gray-200" href="http://localhost:3001/api/auth/google">Transfer</a>}

        </>
    );
}

export default App;
