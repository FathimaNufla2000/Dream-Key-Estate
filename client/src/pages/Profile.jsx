/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useSelector} from 'react-redux';
import { useRef, useState,useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser}= useSelector((state)=>state.user);
  const [file, setFile]= useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});

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

      (error)=>{
          setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
          setFormData({...formData, avatar: downloadURL })
      );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-cyan-700 text-center font-bold 
      my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input onChange={(e)=>setFile(e.target.files[0])} 
        type='file' ref={fileRef} hidden accept='image/*'></input>

        <img onClick={()=>fileRef.current.click()}
        src={formData.avatar || currentUser.avatar} alt='profile' 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

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
              ) : 
              ( "" )
          }
        </p>

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
