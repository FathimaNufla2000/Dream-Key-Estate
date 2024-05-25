/* eslint-disable no-unused-vars */
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-cyan-900 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-cyan-100'>Dream-Key</span>
                <span className='text-cyan-500'>Estate</span>
            </h1>
            </Link>
            <form className='bg-cyan-100 p-3 rounded-lg flex items-center'>
                <input type='text'  placeholder='Search...' 
                className='bg-transparent font-semibold focus:outline-none w-24 sm:w-64 '>
                </input>
                <FaSearch className='text-cyan-700' />
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='font-bold hidden sm:inline text-cyan-300 hover:underline'>
                    Home</li>
                </Link>
                <Link to='/about'> 
                <li className=' font-bold hidden sm:inline text-cyan-300  hover:underline'>
                    About</li>
                </Link> 

                <Link to='/profile'>    
                {currentUser? (
                    <img className ='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar} alt='profile' />
                    ): ( 
                    <li className='text-cyan-300 font-bold hover:underline'>Sign in</li>
                )} 
                </Link>  
                
            </ul>
        </div>     
    </header>
  )
}
