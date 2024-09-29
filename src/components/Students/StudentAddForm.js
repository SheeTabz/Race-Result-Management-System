import React from 'react';

const StudentAddForm = () => {
    return(
        <div className="w-2/5 m-auto">
      
        <form className='input-form'>
        <div className=" w-full flex-1">
          <label className="input-label  ">
           Student Name
          </label>
          <div className=" input-wrapper ">
            <input
              name="race-title"
              placeholder="Student Name"
              className="input "
            />
          </div>
        </div>

        <div className=" w-full flex-1">
          <label className="input-label  ">
            Student Age
          </label>
          <div className="input-wrapper">
          <input
             type={'number'}
             name="age"
              placeholder="Student Age"
              className=" input "
            />
          </div>
        </div>
        <div className=" w-full flex-1">
          <label className="input-label  ">
           Student Registration Number
          </label>
          <div className="input-wrapper">
          <input
             type={'number'}
             name="registration"
              placeholder="Student Registration No"
              className=" input "
            />
          </div>
        </div>
        <button type='submit' 
        className="mt-2 w-full appearance-none p-1 px-2 text-white outline-none bg-orange-600"
        >Submit</button>
        </form>
      </div>
    );
}

export default StudentAddForm;
