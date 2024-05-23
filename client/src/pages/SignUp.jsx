/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold'>Sign Up</h1>
      <br></br>
      <form className=' flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border bg-cyan-100 p-3 font-semibold rounded-lg' id='username' />
        <input type='email' placeholder='email' className='border bg-cyan-100 p-3 font-semibold rounded-lg' id='email' />
        <input type='password' placeholder='password' className='border bg-cyan-100 p-3 font-semibold rounded-lg' id='password' />
        <button className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 font-bold'>Sign Up </button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-cyan-800 font-bold'>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700 font-bold'>Sign in</span>
        </Link>
      </div>
      </div>
  )
}
