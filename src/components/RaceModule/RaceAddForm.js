import React from 'react';

const RaceAddForm = () => {
    return (
        <div className="w-4/5 m-auto">
      
        <form className='input-form'>
        <div className=" w-full flex-1">
          <label className="input-label  ">
           Race Title
          </label>
          <div className=" input-wrapper ">
            <input
              name="race-title"
              placeholder="Provide title"
              className="input "
            />
          </div>
        </div>

        <div className=" w-full flex-1">
          <label className="input-label  ">
            Start Date
          </label>
          <div className="input-wrapper">
          <input
             type={'date'}
             name="start-date"
              placeholder="Race Dates"
              className=" input "
            />
          </div>
        </div>
        <div className=" w-full flex-1">
          <label className="input-label  ">
           End Date
          </label>
          <div className="input-wrapper">
          <input
             type={'date'}
             name="end-date"
              placeholder="Race Dates"
              className=" input "
            />
          </div>
        </div>
        <div className=" w-full flex-1">
          <label className="input-label">
            Description
          </label>
          <div className="input-wrapper ">
            <textarea
            name="description"
              placeholder="Description"
              rows={4}
              type="password"
              className="input"
            ></textarea>
          </div>
        </div>
        <button type='submit' 
        className="mt-2 w-full appearance-none p-1 px-2 text-white outline-none bg-orange-600"
        >Submit</button>
        </form>
      </div>
    );
}

export default RaceAddForm;
