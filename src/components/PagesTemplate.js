import React from 'react'
// import {track} from "public/track.jpg"
// import { Link } from 'react-router-dom';

function PagesTemplate({pageData}) {
  return (
    <div className='hero h-[25vh] lg:h-[25vh] text-white w-full'>
    <div className='  h-full w-full bg-no-repeat bg-cover  bg-[url("https://img.freepik.com/premium-photo/running-track_629524-11583.jpg?w=1380")]'>
    <div className='review h-full'>
    <div className=' relative flex flex-col justify-center items-center' >
      <div className=' space-y-6 flex flex-col items-center justify-center space-x-3 p-4  max-w-max px-20 py-10'>
    
        <h1 className='text-7xl title font-["Shadows Into Light"] '>{pageData}</h1>
         <p className='text-3xl font-light'>
          Home .  </p>
       
         
        
      </div>
     </div>
     </div>
     </div>
 </div>
  )
}

export default PagesTemplate