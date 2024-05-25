/* eslint-disable no-unused-vars */
import {useSelector} from 'react-redux';
export default function Profile() {
  const {currentUser}= useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold 
      my-7'>Profile</h1>
      <br></br>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='profile' 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <input type='text' 
        placeholder='username' 
        id='username'
        className='border bg-cyan-100 p-3 font-semibold rounded-lg' 
        />

        <input type='email' 
        placeholder='email' 
        id='email'
        className='border bg-cyan-100 p-3 font-semibold rounded-lg' 
        />

        <input type='text' 
        placeholder='password' 
        id='password'
        className='border bg-cyan-100 p-3 font-semibold rounded-lg' 
        />  
        
        <button className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 font-bold'>
          update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer font-bold'>Delete account</span>
          <span className='text-red-700 cursor-pointer font-bold'>Sign out</span>
      </div>
      </div>
  )
}
