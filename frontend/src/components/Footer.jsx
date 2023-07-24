import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <div className='ml-[8vw]'>
                <div className='w-[90%] h-[1px] bg-gray-300 mr-auto my-10 mb-12'></div>

                <div className='flex flex-row justify-between items-center text-right mr-[8vw]'>
                    <Link to="/transfer" className='hover:underline text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] mr-auto'>Sign In → </Link>
                    <a href="https://github.com/Jingyue-Wu/switchify"><img className="w-10 h-10" src="github.png"></img></a>
                    <a href='#' className='text-[5vw] md:text-[2vw] lg:text-[3vw] break-words lg:max-w-[40vw] ml-auto mr-1.5 text-gray-400 hover:cursor-pointer'>Switchify</a>
                </div>
            </div>
        </>
    );
}