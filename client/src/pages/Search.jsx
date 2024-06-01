/* eslint-disable no-unused-vars */
import React from 'react';

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row font-serif  '>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen border border-cyan-500'>
        <form className='flex flex-col gap-8'>
          <div className='flex items-center gap-2 font-bold'>
            <label className='whitespace-nowrap font-bold text-cyan-900'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border border-cyan-500 rounded-lg p-3 w-full  bg-cyan-100'
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-bold text-cyan-900'>Type:</label>
            <div className='flex gap-2  text-cyan-700 font-semibold'>
              <input type='checkbox' id='all' className='w-5' />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2 text-cyan-700 font-semibold'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2 text-cyan-700 font-semibold'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sale</span>
            </div>
            <div className='flex gap-2 text-cyan-700 font-semibold'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-bold text-cyan-900'>Amenities:</label>
            <div className='flex gap-2 text-cyan-700 font-semibold'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking</span>
            </div>
            <div className='flex gap-2 text-cyan-700 font-semibold'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-bold text-cyan-900'>Sort:</label>
            <select id='sort_order' className='border border-cyan-500 bg-cyan-100 text-cyan-700 font-semibold rounded-lg p-3'>
              <option>Price high to low</option>
              <option>Price low to hight</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
          hover:opacity-95 disabled:opacity-80 font-bold'>
            Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-cyan-800 mt-5'>Listing results:</h1>
      </div>
    </div>
  );
}