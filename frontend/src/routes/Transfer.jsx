import '../App.css';
import { useEffect, useState } from 'react';

export default function Transfer() {
    // Spotify
    // const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    // const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URL;
    // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    // const RESPONSE_TYPE = "token";
    // let SCOPE = 'playlist-read-private playlist-read-collaborative';
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

    const [playlistName, setPlaylistName] = useState('');


    const searchSongs = async (id) => {
        try {
            const limit = 100;
            let offset = 0;
            let allSongs = [];
            let filteredSongs = [];

            setPlaylistName(playlists.find((playlist) => playlist.id === id).name);

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

    const transfer = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playlistName,
                    songs: songsWithArtists,
                }),
            });

            if (res.ok) {
                console.log('Transfer successful!');
                window.location.href = "http://localhost:3001/api/auth/google";

            } else {
                console.log('Transfer failed.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    return (
        <>
            <header className='navbar fixed top-0 left-0 w-full flex flex-row justify-between items-cente p-10 px-[5vw]'>
                <a href='/' className='text-[5vw] md:text-[3vw] lg:text-[3vw] text-gray-500'>Switchify</a>
                {!token ? (
                    // <a className='text-[5vw] md:text-[2vw] lg:text-[2vw] break-words hover:underline' href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                    <a className='text-[5vw] md:text-[2vw] lg:text-[2vw] break-words hover:underline' href={'http://localhost:3001/api/auth/spotify'}>Login to Spotify</a>

                ) : (
                    <button className='text-[5vw] md:text-[2vw] lg:text-[2vw] break-words hover:underline' onClick={logout}>Logout</button>
                )}
            </header>

            <div className='mt-[5em]'>
                <h1 className='text-[8vw] md:text-[4vw] lg:text-[6vw] break-words mr-1-auto'>Select Your Playlist</h1>
                <div className='w-[80%] h-[1px] bg-gray-300 m-auto my-5'></div>
            </div>

            <ul>
                {playlists.map(playlist => <li key={playlist.id}>
                    <a href="#songs">
                        <button className='text-[4vw] md:text-[1.5vw] lg:text-[1.5vw] break-words hover:underline' onClick={() => {

                            setTimeout(() => {
                                history.replaceState(null, null, window.location.pathname);
                            }, 2);
                            searchSongs(playlist.id);

                        }}>{playlist.name}</button>

                        <div className='w-[25%] h-[1px] bg-gray-300 m-auto my-5'></div>
                    </a>
                </li>)}
            </ul>

            <div className='mt-24'>
                <h1 className='text-[8vw] md:text-[4vw] lg:text-[6vw] break-words mr-1-auto' id='songs'>Songs to be transferred</h1>
                <div className='w-[80%] h-[1px] bg-gray-300 m-auto my-5'></div>

                <a href='#convert' className='text-[8vw] md:text-[4vw] lg:text-[6vw] hover:text-gray-400' id='songs'>
                    <button onClick={() => {
                        setTimeout(() => {
                            history.replaceState(null, null, window.location.pathname);
                        }, 2);
                    }}>↓</button>
                </a>


                <ul>
                    {songs.map((song, index) => (<li key={`${song.track.id}_${index}`}>{song.track.name}
                        <div className='w-[25%] h-[1px] bg-gray-300 m-auto my-2'></div></li>))}
                </ul>
            </div>

            {songsWithArtists.length > 0 && <button className="text-[8vw] md:text-[3vw] lg:text-[4vw] break-words mr-1-auto hover:underline my-10" id='convert' onClick={transfer}>Begin Transfer →</button>}

            <div className='ml-[8vw]'>
                <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-10 mb-12'></div>

                <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
                    <a href='/' className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto  text-gray-500'>Switchify</a>
                    <a href="https://github.com/Jingyue-Wu/switchify"><img className="w-10 h-10" src="github.png"></img></a>
                </div>
            </div>
        </>
    );
}


