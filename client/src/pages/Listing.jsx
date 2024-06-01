import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
    } from 'react-icons/fa';

    // https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async () => {
            try {   
                setLoading(true);
                const res = await 
                fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            }     
            catch (error) {
                setError(true);  
                setLoading(false);
                }
        };
        fetchListing();
    }, [params.listingId]);
    console.log(loading);

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl font-bold
         text-green-700'>Loading...</p>}
        {error && (
            <p className='text-center my-7 text-2xl text-red-700 font-semibold'>
                Something went wrong!</p>
            )}
        {listing && !loading && !error && 
        (
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div 
                            className='h-[300px]'
                            style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                                ></div>
                        </SwiperSlide>
                    ))}
                    </Swiper>

            <div className='fixed top-[13%] right-[3%] z-10 border 
            rounded-full w-12 h-12 flex justify-center items-center bg-red-200 cursor-pointer'>
            <FaShare
              className='text-red-700'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-300 p-2 font-serif text-red-700 font-bold'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-bold font-serif text-cyan-900'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-green-900 font-bold text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center font-mono p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center font-mono p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className='text-blue-700 font-semibold font-serif'>
              <span className='font-bold text-blue-950 font-serif'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-bold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
