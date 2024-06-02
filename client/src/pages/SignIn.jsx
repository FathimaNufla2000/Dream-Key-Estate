import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData(
      {
        ...formData,
        [e.target.id]:e.target.value,
      });
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res= await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } 
    catch(error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto font-serif'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold 
      my-7'>Sign In</h1>
      <br></br>
      <form onSubmit={handleSubmit} className=' flex flex-col 
      gap-4'>
        <input type='email' 
        placeholder='email' 
        className='border border-cyan-500 bg-cyan-100 text-blue-800 p-3 font-semibold rounded-lg' 
        id='email' 
        onChange={handleChange} 
        />
        <input type='password' 
        placeholder='password' 
        className='border border-cyan-500 bg-cyan-100 text-blue-800 p-3 font-semibold rounded-lg' 
        id='password' 
        onChange={handleChange} 
        />
        <button className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 font-bold border border-cyan-500'>
          {loading ? 'loading...': 'Sign In'} 
        </button>
        <OAuth />

      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-cyan-800 font-bold'>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700 font-bold'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 font-bold mt-5 '>{error}</p>}
      </div>
  );
}
