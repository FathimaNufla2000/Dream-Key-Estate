import {useSelector} from 'react-redux';
import { useRef, useState,useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, 
          updateUserSuccess, 
          updateUserFailure, 
          deleteUserFailure, 
          deleteUserStart, 
          deleteUserSuccess,
          signOutUserStart} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser,loading,error}= useSelector((state)=>state.user);
  const [file, setFile]= useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings]=useState([]);
  const dispatch = useDispatch();

  //firebase storage
  //allow read;
  // allow write: if
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')

  useEffect(()=> {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask =uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes)*100;
          setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
          setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
          setFormData({...formData, avatar: downloadURL })
      );
      });
  };

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
};

const handleSubmit = async(e) => {
  e.preventDefault();
  try{
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {

      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data= await res.json();
    if(data.success === false){
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);

  }catch(error){
    dispatch(updateUserFailure(error.message));
  }
};

const handleDeleteUser = async () =>{
  try {
    dispatch(deleteUserStart());
    const res =await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));

  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

const handleSignOut = async () => {
  try {
    dispatch (signOutUserStart());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(data.message));
  }};

const handleShowListings = async () => {
  try {
    setShowListingsError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if(data.success === false){
      setShowListingsError(true);
      return;
    }
    setUserListings(data);
  } catch (error) {
    setShowListingsError(true);
  }
};

const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if(data.success === false){
      console.log(data.message);
      return;
    }

    setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
  } catch (error) {
    console.log(error.message);
  }
};
  return (
    <div className='p-3 max-w-lg mx-auto font-serif'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold 
      my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={(e)=>setFile(e.target.files[0])} 
        type='file' ref={fileRef} hidden accept='image/*'></input>

        <img onClick={()=>fileRef.current.click()}
        src={formData?.avatar || currentUser.avatar} alt='profile' 
        className='border border-cyan-900 rounded-full h-24 w-24 
        object-cover cursor-pointer self-center mt-2' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
          <span  className='text-red-700 font-semibold'> Error image upload
           (image must be less than 2 MB)</span>
           ) :  filePerc > 0 && filePerc < 100 ? (
            <span className= 'text-slate-700 font-semibold'>{`Uploading ${filePerc}%` }
            </span>
           ):
            filePerc === 100 ? (
               <span className='text-green-700 font-semibold'>Image Successfully uploaded!</span>
              ) : (
                 "" 
                )
          }
        </p>

        <input type='text' 
        placeholder='username'
        defaultValue={currentUser.username} 
        id='username'
        className='border border-cyan-500 bg-cyan-100 p-3 font-semibold rounded-lg text-blue-800' 
        onChange={handleChange}
        />

        <input type='email' 
        placeholder='email' 
        defaultValue={currentUser.email} 
        id='email'
        className='border border-cyan-500 bg-cyan-100 text-blue-800 p-3 font-semibold rounded-lg' 
        onChange={handleChange}
        />

        <input type='password' 
        placeholder='password' 
        id='password'
        className='border border-cyan-500 bg-cyan-100 text-blue-800 p-3 font-semibold rounded-lg' 
        onChange={handleChange}
       />  
        
        <button disabled={loading} 
        className='border border-cyan-500 bg-cyan-900 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 font-bold'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className='border border-cyan-500 bg-green-800 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 text-center disabled:opacity-80 font-bold' to = {"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer font-bold'>Delete account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer font-bold'>Sign out</span>
      </div>

      <p className='text-red-700 mt-5 font-semibold' >{error ?error : ''} </p>

      <p className='text-green-700 mt-5 font-semibold'>{updateSuccess? 'User is updated successfully!': ''}</p>
      <button onClick={handleShowListings}
      className='text-green-700 font-bold w-full'>Show Listings</button>
      <p className='text-red-700 font-bold mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
      
      {userListings && 
      userListings.length > 0 && 
      <div className="flex flex-col gap-4">
        <h1 className='text-center my-7 text-2xl font-bold text-blue-900'>Your Listings </h1>
        {userListings.map((listing) => (
        <div key={listing._id} 
        className='border border-green-500 bg-sky-100 
        rounded-lg p-3 flex justify-between items-center gap-4'>

          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt='listing cover'
            className='h-16 w-16 object-contain'></img>
          </Link>
          <Link className='text-cyan-900 font-bold hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
            <p> {listing.name}</p>
          </Link>
            <div className='flex flex-col items-center'>
              <button onClick={()=>handleListingDelete(listing._id)} 
              className='text-red-700 uppercase font-bold'>Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-700 uppercase font-bold'>Edit</button>
              </Link>
            </div>
          </div> 
      ))}
      </div>
      }
      </div>
  );
}
