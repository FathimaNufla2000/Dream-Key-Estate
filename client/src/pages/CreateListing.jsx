/* eslint-disable no-unused-vars */
import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold 
      my-7'>
      Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
       <div className='flex flex-col gap-4 flex-1'>
      <input type='text' 
        placeholder='Name' 
        className='border border-cyan-500 bg-cyan-100 p-3 font-semibold rounded-lg' 
        id='name'
        maxLength='62'
        minLength='10'
        required
        />

      <textarea type='text' 
        placeholder='Description' 
        className='border border-cyan-500 bg-cyan-100 p-3 font-semibold rounded-lg' 
        id='description'
        required
        />

      <input type='text' 
        placeholder='Address' 
        className='border border-cyan-500 bg-cyan-100 p-3 font-semibold rounded-lg' 
        id='address'
        required
        />

        <div className='flex gap-6 flex-wrap '>
          <div className='flex gap-2'>
            <input type='checkbox' id='sale' className='w-5'></input>
            <span className='text-cyan-900 font-bold'> Sell</span>
          </div>

          <div className='flex gap-2'>
            <input type='checkbox' id='rent' className='w-5'></input>
            <span className='text-cyan-900 font-bold'> Rent </span>
          </div>

          <div className='flex gap-2'>
            <input type='checkbox' id='parking' className='w-5'></input>
            <span className='text-cyan-900 font-bold'> Parking spot</span>
          </div>

          <div className='flex gap-2'>
            <input type='checkbox' id='furnished' className='w-5'></input>
            <span className='text-cyan-900 font-bold'> Furnished</span>
          </div>

          <div className='flex gap-2'>
            <input type='checkbox' id='offer' className='w-5'></input>
            <span className='text-cyan-900 font-bold'> Offer </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <input type='number' id='bedrooms' min='1' max='10' required 
            className='p-3 border border-cyan-500  bg-cyan-100 rounded-lg text-cyan-900 font-bold'/>
            <p className='text-cyan-900 font-bold'>Beds</p>
          </div>

          <div className="flex items-center gap-2">
            <input type='number' id='bathrooms' min='1' max='10' required 
            className='p-3 border border-cyan-500  bg-cyan-100 rounded-lg text-cyan-900 font-bold'/>
            <p className='text-cyan-900 font-bold'>Baths</p>
          </div>

          <div className="flex items-center gap-2">
            <input type='number' id='regularPrice' min='1' max='10' required 
            className='p-3 border border-cyan-500  bg-cyan-100 rounded-lg text-cyan-900 font-bold'/>
            <div className='flex flex-col items-center'>
            <p className='text-cyan-900 font-bold'>Regular price</p>
            <span className='text-cyan-700 font-bold text-xs'>($ / Month)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type='number' id='discountPrice' min='1' max='10' required 
            className='p-3 border border-cyan-500  bg-cyan-100 rounded-lg text-cyan-900 font-bold'/>
            <div  className='flex flex-col items-center'>
            <p className='text-cyan-900 font-bold'>Discounted price</p>
            <span className='text-cyan-700 font-bold text-xs'>($ / Month)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 ">
        <p className='text-cyan-900 font-bold'>Images:
          <span className='font-semibold text-green-700 ml-2'>The first image will be the cover (max 6)</span>
        </p>
        <div className='flex gap-4'>
          <input className='p-3 border border-cyan-500 bg-cyan-100 rounded w-full' type='file' id='images' accept='image/*' multiple />
          <button className='p-3  text-green-700 border border-cyan-500 font-semibold bg-cyan-100 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
        </div>
        <button className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 font-bold'>Create Listing</button>
      </div>
      
      </form>
    </main>
  )
}
