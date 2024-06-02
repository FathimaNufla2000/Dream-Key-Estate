import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate  } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
         e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-cyan-900 shadow-md font-serif'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-cyan-100'>Dream-Key</span>
                <span className='text-cyan-500'>Estate</span>
            </h1>
            </Link>
            <form
             onSubmit={handleSubmit}
             className='bg-cyan-100 p-3 rounded-lg flex items-center'>

                <input 
                type='text' 
                placeholder='Search...' 
                className='bg-transparent font-semibold focus:outline-none w-24 sm:w-64 text-blue-800'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}>
                </input>

                <button>
                <FaSearch className='text-cyan-700' />
                </button>

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
                    <img 
                    className ='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar} 
                    alt='profile' />
                    ): ( 
                    <li className='text-cyan-300 font-bold hover:underline'>Sign in</li>
                )} 
                </Link>   
            </ul>
        </div>     
    </header>
  )
}
