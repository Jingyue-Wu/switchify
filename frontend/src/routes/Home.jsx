import { Link } from 'react-router-dom';
import '../App.css';



export default function Home() {

    return (
        <>
            <div className='font-manrope p-10'>
                <div className='h-[100vh]'>
                    <div className='flex items-center justify-center flex-col'>
                        <h1 className='text-[17vw]'>Switchify</h1>
                    </div>
                    <div className='text-right mr-[8vw] mb-96'>
                        <div className='w-[90%] h-[1px] bg-gray-300 ml-auto mb-5'></div>
                        <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto'>Seamlessly convert your playlists from Spotify to YouTube </h2>
                        <div className='w-[40vw] h-[1px] bg-gray-300 ml-auto my-5'></div>
                        <Link to="/transfer" className='hover:underline text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto'>Try it out for free ↓</Link>
                        <div className='w-[13vw] h-[1px] bg-gray-300 ml-auto my-5'></div>
                    </div>
                </div>

                <div className='text-left ml-[8vw] mb-72'>
                    <h1 className='text-[8vw] md:text-[4vw] lg:text-[6vw] break-words mr-1-auto'>How it Works ...</h1>
                    <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>



                    <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
                        <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>01 </h3>
                        <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto mr-1.5'>Login to your Spotify Account</h2>
                    </div>

                    <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>

                    <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
                        <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>02 </h3>
                        <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto mr-1.5'>Select playlist to transfer and review songs</h2>
                    </div>
                    <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>

                    <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
                        <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>03 </h3>
                        <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words lg:max-w-[40vw] ml-auto mr-1.5'>Sign in to your YouTube Account</h2>
                    </div>
                    <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>


                    <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
                        <h3 className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto text-gray-500'>04 </h3>
                        <h2 className='text-[5vw] md:text-[2vw] lg:text-[1.5vw] break-words ml-auto mr-1.5'>Your playlist will magically appear on YouTube and YouTube Music!</h2>
                    </div>
                    <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-5'></div>


                    <h3 className='text-[5vw] md:text-[2vw] lg:text-[1vw] break-words lg:max-w-[40vw] mr-auto'>Note: currently due to API Quotas, there is a 10 song limit </h3>
                </div>

            </div>
        </>
    );
}



