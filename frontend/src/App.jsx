import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Transfer from './routes/Transfer';
import Home from './routes/Home';


function App() {

    const Layout = () => {
        return (
            <>
                <Outlet />
            </>
        );
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/transfer" element={<Transfer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;










// import './App.css';
// import { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Transfer from './routes/transfer';


// function App() {
//     // Spotify
//     const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//     const REDIRECT_URI = "http://localhost:5173";
//     const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
//     const RESPONSE_TYPE = "token";
//     let SCOPE = 'playlist-read-private playlist-read-collaborative';
//     const [token, setToken] = useState("");

//     useEffect(() => {
//         const hash = window.location.hash;
//         let token = window.localStorage.getItem("token");

//         if (hash) {
//             console.log("Logged In");
//             token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
//             window.location.hash = "";
//             window.localStorage.setItem("token", token);
//         }
//         setToken(token);
//     }, []);

//     const logout = () => {
//         setToken("");
//         window.localStorage.removeItem("token", token);
//         location.reload();
//     };


//     //Get User ID
//     let user_id = "";

//     const getUserInfo = async () => {
//         try {
//             const response = await fetch("https://api.spotify.com/v1/me", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 user_id = data.id;
//                 console.log(user_id);
//                 getPlaylists();
//             }
//             else {
//                 console.log("Error");
//             }
//         }
//         catch (error) {
//             console.log("Error:", error);
//         }
//     };


//     //Search
//     const [playlists, setPlaylists] = useState([]);

//     const getPlaylists = async () => {
//         try {
//             const response = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 // const id = data.items.map((playlist) => playlist.id);
//                 setPlaylists(data.items);
//             }
//             else {
//                 console.log("Error");
//             }
//         }
//         catch (error) {
//             console.log("Error:", error);
//         }
//     };


//     useEffect(() => {
//         if (token) {
//             getUserInfo();
//         }
//     }, [token]);


//     const [songs, setSongs] = useState([]);

//     const [songsWithArtists, setSongsWithArtists] = useState([]);

//     const [playlistName, setPlaylistName] = useState('');


//     const searchSongs = async (id) => {
//         try {
//             const limit = 100;
//             let offset = 0;
//             let allSongs = [];
//             let filteredSongs = [];

//             setPlaylistName(playlists.find((playlist) => playlist.id === id).name);

//             for (; ;) {
//                 const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${offset}&additional_types=track%2Cepisode&market=from_token&include_artist_names=true`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 if (response.ok) {
//                     const data = await response.json();

//                     if (data.items && data.items.length > 0) {
//                         allSongs = [...allSongs, ...data.items];
//                         offset += limit;
//                     } else {
//                         break;
//                     }
//                 } else {
//                     console.log("Error");
//                     break;
//                 }
//             }

//             const songsWithArtists = allSongs.filter((song) => song.track && song.track.name !== null && song.track.artists && song.track.artists.length > 0).map((song) => {
//                 return {
//                     name: song.track.name,
//                     artist: song.track.artists[0].name
//                 };
//             });
//             setSongsWithArtists(songsWithArtists);

//             filteredSongs = allSongs.filter((song) => song.track && song.track.name !== null && song.track.artists && song.track.artists.length > 0);
//             setSongs(filteredSongs);

//             console.log(songsWithArtists);

//         } catch (error) {
//             console.log("Error:", error);
//         }
//     };

//     const transfer = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:3001/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name: playlistName,
//                     songs: songsWithArtists,
//                 }),
//             });

//             if (res.ok) {
//                 console.log('Transfer successful!');
//                 window.location.href = "http://localhost:3001/api/auth/google";

//             } else {
//                 console.log('Transfer failed.');
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     };




//     return (
//         <>

//             <BrowserRouter>
//                 <Routes>
//                     {/* <Route path="/" element={<Home />} /> */}
//                     <Route path="/transfer" element={<Transfer />} />
//                 </Routes>

//             </BrowserRouter>



//             <div className='font-manrope p-10'>
//                 <div className='h-[100vh]'>
//                     <div className='flex items-center justify-center flex-col'>
//                         <h1 className='text-[17vw]'>Switchify</h1>
//                     </div>
//                     <div className='text-right mr-[8vw] mb-96'>
//                         <div className='w-[90%] h-[1px] bg-gray-300 ml-auto mb-5'></div>
//                         <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto'>Seamlessly convert your playlists from Spotify to YouTube </h2>
//                         <div className='w-[40vw] h-[1px] bg-gray-300 ml-auto my-5'></div>
//                         <a href='#' className='hover:underline text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto'>Try it out for free ↓</a>
//                         <div className='w-[13vw] h-[1px] bg-gray-300 ml-auto my-5'></div>
//                     </div>
//                 </div>

//                 <div className='text-left ml-[8vw] mb-72'>
//                     <h1 className='text-[8vw] md:text-[4vw] lg:text-[6vw] break-words mr-1-auto'>How it Works ...</h1>
//                     <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>



//                     <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
//                         <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>01 </h3>
//                         <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto mr-1.5'>Login to your Spotify Account</h2>
//                     </div>

//                     <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>

//                     <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
//                         <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>02 </h3>
//                         <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto mr-1.5'>Select playlist to transfer and review songs</h2>
//                     </div>
//                     <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>

//                     <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
//                         <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>03 </h3>
//                         <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto mr-1.5'>Sign in to your YouTube Account</h2>
//                     </div>
//                     <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>


//                     <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
//                         <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>04 </h3>
//                         <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words ml-auto mr-1.5'>Your playlist will magically appear on YouTube and YouTube Music!</h2>
//                     </div>
//                     <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>


//                     <h3 className='text-[5vw] md:text-[2vw] lg:text-[1vw] break-words lg:max-w-[40vw] mr-auto'>Note: currently due to API Quotas, there is a 10 song limit </h3>
//                 </div>




//                 {!token ? <a className='text-[5vw] md:text-[2vw] lg:text-[2vw] break-words ml-auto mr-1.5' href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> :
//                     <button className="underline" onClick={logout}>Logout</button>}

//                 <h1 className='font-bold'>Select Playlist:</h1>
//                 <ul>
//                     {playlists.map(playlist => <li key={playlist.id}><button onClick={() => searchSongs(playlist.id)}>{playlist.name}</button></li>)}
//                 </ul>

//                 <br />
//                 <h1 className='font-bold'>Songs to be transferred:</h1>
//                 <ul>
//                     {songs.map((song, index) => (<li key={`${song.track.id}_${index}`}>{song.track.name}</li>))}
//                 </ul>

//                 {songsWithArtists.length > 0 && <button className="underline text-xl bg-gray-200" onClick={transfer}>Transfer</button>}
//             </div>
//         </>
//     );
// }

// export default App;
