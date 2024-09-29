import React from 'react';

const RaceParticipantForm = () => {
    return(
        <div className="w-2/5 m-auto">
      
        <form className='input-form'>
        <div className=" w-full flex-1">
          <label className="input-label  ">
           Student Name
          </label>
          <div className="input-wrapper ">
            <select 
            // onChange={handleChange}
             className="input " 
             name="participant"
             >
               <option value="">John Doe</option>
               <option value="">Peterson Andrew</option>
               <option value="">Agnes Perry</option>

            </select>

          </div>
        </div>
        <div className=" w-full flex-1">
          <label className="input-label  ">
           Track Lane
          </label>
          <div className="input-wrapper ">
            <select 
             className="input " 
             name="lane"
             >
               <option value="">Lane 1</option>
               <option value="">Lane 2</option>
               <option value="">Lane 3</option>

            </select>

          </div>
        </div>


        <button type='submit' 
        className="mt-2 w-full appearance-none p-1 px-2 text-white outline-none bg-orange-600"
        >Submit</button>
        </form>
      </div>
    );
}

export default RaceParticipantForm;
