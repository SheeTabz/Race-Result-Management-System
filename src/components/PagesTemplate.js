import React from 'react'


function PagesTemplate({pageData}) {
  return (
    <div className='hero xs:h-[15vh]  h-[10vh] lg:h-[25vh] text-white w-full'>
    <div className='  h-full w-full bg-no-repeat bg-cover  bg-[url("https://img.freepik.com/premium-photo/running-track_629524-11583.jpg?w=1380")]'>
    <div className='review h-full'>
    {/* <div className=' relative flex flex-col justify-center items-center' > */}
      <div className=' flex flex-col items-center justify-center align-center smax-w-max px-20 py-10'>
        <h1 className=' xs:text-2xl md:text-5xl title font-["Shadows Into Light"] '>{pageData}</h1>
      </div>
     {/* </div> */}
     </div>
     </div>
 </div>
  )
}

export default PagesTemplate