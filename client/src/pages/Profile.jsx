/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
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
  }

};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold 
      my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={(e)=>setFile(e.target.files[0])} 
        type='file' ref={fileRef} hidden accept='image/*'></input>

        <img onClick={()=>fileRef.current.click()}
        src={formData?.avatar || currentUser.avatar} alt='profile' 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
        />

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
        className='border bg-cyan-100 p-3 font-semibold rounded-lg' 
        onChange={handleChange}
        />

        <input type='email' 
        placeholder='email' 
        defaultValue={currentUser.email} 
        id='email'
        className='border bg-cyan-100 p-3 font-semibold rounded-lg' 
        onChange={handleChange}
        />

        <input type='password' 
        placeholder='password' 
        id='password'
        className='border bg-cyan-100 p-3 font-semibold rounded-lg' 
        onChange={handleChange}
       />  
        
        <button disabled={loading} className='bg-cyan-900 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 font-bold'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase 
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
      </div>
  )
}
