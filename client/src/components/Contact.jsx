/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2 font-semibold'>
          <p>
            Contact <span className='font-bold text-pink-700'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-bold  text-pink-700'>{listing.name.toLowerCase()}</span>
            </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border border-cyan-500 bg-cyan-100 p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
          hover:opacity-95 disabled:opacity-80 font-bold text-center'>
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}